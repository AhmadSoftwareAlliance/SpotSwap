import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  Platform,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
import {CHAT_URL} from '@env';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {useIsFocused} from '@react-navigation/core';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {
  AppButton,
  AppLoader,
  HomeModal,
  HomeHeader,
  useChannel,
  useActionCable,
} from '../../../../components';
import {
  WP,
  colors,
  scrWidth,
  appIcons,
  scrHeight,
  appImages,
  mapCustomStyle,
} from '../../../../shared/exporter';
import {styles} from './styles';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {
  confirmArrivalReq,
  transferParkingSpotReq,
  createConversationRequest,
} from '../../../../redux/actions';
import { log } from 'react-native-reanimated';

let watchID;
const ASPECT_RATIO = scrWidth / scrHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ConnectedToFinder = ({navigation, route}) => {
  const mapRef = useRef(null);
  const isFocus = useIsFocused(null);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [destination, setDestination] = useState({
    latitude: 31.4941132,
    longitude: 74.3043935,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [time, setTime] = useState('');
  const [isOkay, setIsOkay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState('');
  const [connectionRes, setConnectionRes] = useState('');
  const [showAppModal, setShowAppModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tracksDestChanges, setTracksDestChanges] = useState(true);
  const [tracksOriginChanges, setTracksOriginChanges] = useState(true);

  // redux stuff
  const dispatch = useDispatch(null);
  const {userInfo} = useSelector(state => state?.auth);

  const {actionCable} = useActionCable(CHAT_URL, userInfo?.token);
  const {subscribe, unsubscribe} = useChannel(actionCable);

  useLayoutEffect(() => {
    getWalletAmount();
  }, [isFocus]);

  const getWalletAmount = async () => {
    let amount = await AsyncStorage.getItem('walletAmount');
    setWalletAmount(amount);
  };

  useEffect(() => {
    const {swapper} = route?.params?.item;
    setConnectionRes(route?.params?.item);
    setDestination({
      latitude: swapper?.latitude,
      longitude: swapper?.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, []);

  useEffect(() => {
    // if (isFocus) {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
        askForPermissions();
      }
    // }
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [isFocus]);

  useEffect(() => {
    try {
      subscribe(
        {
          channel: 'LocationTrackingChannel',
        },
        {
          received: loc => {
            const {swapper_latitude, swapper_longitude} = loc?.body;
            setDestination({
              latitude: swapper_latitude,
              longitude: swapper_longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
          },
          connected: () => {},
        },
      );
    } catch (err) {
      console.log('err', err);
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const askForPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      getLocation();
    }
  };

  const getLocation = () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
    watchID = Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position?.coords;
        let mapRegion = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setRegion(mapRegion);
        mapRef?.current?.animateToRegion(mapRegion, 1000);
      },
      error => {
        console.log('Error Code ==> ', error.code);
        console.log('Error Msg ==> ', error.message);
      },
      {
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 1,
        enableHighAccuracy: true,
      },
    );
  };

  const handleMessageButton = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('recepient_id', connectionRes?.swapper?.id);
    dispatch(
      createConversationRequest(
        params,
        res => {
          setIsLoading(false);
          navigation.navigate('Inbox', {item: res?.conversation});
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const handleTransferSlot = () => {
    console.log(" connectionRes?.swapper_host_connection_id", connectionRes?.swapper_host_connection_id);
    if (isOkay) {
      setShowAppModal(false);
      setIsOkay(false);
      setIsLoading(true);
      const params = new FormData();
      params.append('connection_id', connectionRes?.swapper_host_connection_id);
      dispatch(
        transferParkingSpotReq(
          params,
          res => {
            setIsLoading(false);
            alert(res?.message);
          },
          err => {
            setIsLoading(false);
            console.log('Err ==> ', err);
          },
        ),
      );
    } else {
      setIsOkay(true);
      setShowAppModal(true);
    }
  };

  const handleConfirmArrival = () => {
   
    setShowConfirmModal(false);
    setIsLoading(true);
    const params = new FormData();
    params.append('swapper_id', connectionRes?.swapper?.id);
    dispatch(
      confirmArrivalReq(
        params,
        res => {
         
          setIsLoading(false);
          alert(res?.message);
        },
        err => {
          setIsLoading(false);
          Alert.alert('Connection Cancelled', err, [
            {
              text: 'OK',
              onPress: () => {
                console.log("on ok called");
                navigation.navigate('Home');
              },
            },
          ]);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const openDialScreen = () => {
    let number = '';
    let phoneNum = `+${connectionRes?.swapper?.country_code}${connectionRes?.swapper?.contact}`;
    if (Platform.OS === 'ios') {
      number = `telprompt:${phoneNum}`;
    } else {
      number = `tel:${phoneNum}`;
    }
    Linking.openURL(number);
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <View style={styles.headerView}>
        <HomeHeader
          isHome={true}
          walletAmount={walletAmount}
          onPress={() => navigation.navigate('Wallet')}
        />
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={
              connectionRes?.user_image
                ? {uri: connectionRes?.user_image}
                : appImages.car
            }
            style={styles.imgStyle}
          />
          <View style={styles.innerView}>
            <Text style={styles.titleTxtStyle}>
              {connectionRes?.swapper?.name}
            </Text>
            <Text style={styles.bottomText}>
              {connectionRes?.car_model_name}
            </Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>swapper</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          zoomEnabled={true}
          initialRegion={region}
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapCustomStyle}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            tracksViewChanges={tracksOriginChanges}>
            <Image
              fadeDuration={0}
              source={appIcons.currentLoc}
              style={styles.orginMarkerStyle}
              onLoad={() => setTracksOriginChanges(false)}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            tracksViewChanges={tracksDestChanges}>
            <Image
              fadeDuration={0}
              source={appIcons.destinationIcon}
              style={styles.destMarkerStyle}
              onLoad={() => setTracksDestChanges(false)}
            />
          </Marker>
          <MapViewDirections
            strokeWidth={5}
            strokeColor={colors.s7}
            apikey={GOOGLE_MAPS_API_KEY}
            origin={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            destination={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            onReady={result => {
              const {distance, duration} = result;
              console.log(`Distance: ${distance} km`);
              console.log(`Duration: ${duration} min.`);
              let formattedTime = moment
                .utc(moment.duration(duration * 60, 'seconds').asMilliseconds())
                .format('HH:mm:ss');
              setTime(formattedTime);
              // mapRef.current.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: 20,
              //     bottom: 20,
              //     left: 20,
              //     top: 0,
              //   },
              // });
            }}
            onError={err => console.log('Map Directions Error ==> ', err)}
          />
        </MapView>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.boxContainer}>
          <Text style={styles.etaTxtStyle}>ETA</Text>
          <Text style={styles.timeTxtStyle}>{time ? time : '00:00:00'}</Text>
        </View>
        <View style={styles.buttonsRow}>
          <AppButton
            width={WP('55')}
            title={'Transfer Parking Spot'}
            bgColor={colors.r_gradient}
            titleTxtStyle={styles.btnTxtStyle}
            onPress={() => setShowAppModal(true)}
          />
          <AppButton
            isIcon={true}
            iconType="call"
            width={WP('16')}
            onPress={() => openDialScreen()}
          />
          <AppButton
            isIcon={true}
            width={WP('16')}
            iconType="message"
            bgColor={colors.g_gradient}
            onPress={() => handleMessageButton()}
          />
        </View>
        <AppButton
          width={WP('55')}
          title={'Confirm Arrival'}
          bgColor={colors.r_gradient}
          titleTxtStyle={styles.btnTxtStyle}
          onPress={() => setShowConfirmModal(true)}
        />
      </View>
      {showAppModal && (
        <HomeModal
          title={isOkay ? 'You are now leaving your spot' : 'Hol’ up!'}
          show={showAppModal}
          buttonText={isOkay ? 'Yes' : 'Okay'}
          isTextButton={isOkay ? false : true}
          isCrossButton={isOkay ? true : false}
          hideButtonText="Cancel"
          onPress={handleTransferSlot}
          desc={
            isOkay
              ? `Transfer Spot to ${connectionRes?.swapper?.name}`
              : `Are you sure you want to leave this parking slot and leave it to ${connectionRes?.swapper?.name}?`
          }
          onPressHide={() => {
            setIsOkay(false);
            setShowAppModal(false);
          }}
        />
      )}
      {showConfirmModal && (
        <HomeModal
          title={'Confirm Arrival'}
          show={showConfirmModal}
          buttonText="Okay"
          isTextButton={false}
          onPress={handleConfirmArrival}
          desc={`Are you sure you want to send a message ${connectionRes?.host?.name}?`}
          onPressHide={() => setShowAppModal(false)}
        />
      )}
    </ImageBackground>
  );
};

export default ConnectedToFinder;
