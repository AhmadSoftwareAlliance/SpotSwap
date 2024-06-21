import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Linking,
  Platform,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
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
import {useDispatch} from 'react-redux';
import {
  saveSwapperLocReq,
  createConnectionRequest,
  cancelConnectionRequest,
  createConversationRequest,
} from '../../../../redux/actions';

let watchID;
let count = 1;
const ASPECT_RATIO = scrWidth / scrHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ConnectToHost = ({navigation, route}) => {
  const mapRef = useRef(null);
  const isFocus = useIsFocused();
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [destination, setDestination] = useState({
    // latitude: 31.4941132,
    // longitude: 74.3043935,
    // latitudeDelta: LATITUDE_DELTA,
    // longitudeDelta: LONGITUDE_DELTA,
  });
  const [time, setTime] = useState('');
  const [slotItem, setSlotItem] = useState('');
  console.log("slotItem",JSON.stringify(slotItem,null,2));
  const [isLoading, setIsLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [tracksDestChanges, setTracksDestChanges] = useState(true);
  const [tracksOriginChanges, setTracksOriginChanges] = useState(true);

  // redux stuff
  const dispatch = useDispatch(null);

  useLayoutEffect(() => {
    getWalletAmount();
  }, [isFocus]);

  const getWalletAmount = async () => {
    let amount = await AsyncStorage.getItem('walletAmount');
    setWalletAmount(amount);
  };

  useEffect(() => {
    console.log("simple useeffect called");
    let {item, connected} = route?.params;
    setSlotItem(item);
    setDestination({
      latitude: item?.parking_slot?.latitude,
      longitude: item?.parking_slot?.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    setIsConnected(connected === 'true');
  }, []);

  useEffect(() => {
      // console.log("log on connect host useeffect");
      if (Platform.OS === 'ios') {
        getLocation();
        // console.log("aftr getlocation ");
      } else {
        askForPermissions();
      }
    return () => {
      console.log("unmount");
      Geolocation.clearWatch(watchID);
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
    // console.log("log on connectToHost getLocation");
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
    watchID = Geolocation.watchPosition(
      
      position => {
        const {latitude, longitude} = position?.coords;
        let mapRegion = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        // console.log("log on connectToHost getLocation2222",mapRegion);
        mapRef?.current?.animateToRegion(mapRegion)
        setRegion(mapRegion);
        saveSwapperLocation(latitude, longitude);
        if (count === 1) {
          count = 2;
          mapRef?.current?.animateToRegion(mapRegion, 1000);
        }
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

  const saveSwapperLocation = (lat, lon) => {
    const params = new FormData();
    params.append('latitude', lat);
    params.append('longitude', lon);
    params.append('address', 'No address found');
    dispatch(
      saveSwapperLocReq(
        params,
        res => {
          console.log('Res ==> ', res);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>22 ', err);
        },
      ),
    );
  };

  const handleConnectButton = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('parking_slot_id', slotItem?.parking_slot?.id);
    dispatch(
      createConnectionRequest(
        params,
        res => {
          setIsLoading(false);
          setIsConnected(true);
          let connRes = res?.swapper_host_connection;
          setSlotItem(connRes);
          setDestination({
            latitude: connRes?.parking_slot?.latitude,
            longitude: connRes?.parking_slot?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        },
        err => {
          setIsLoading(false);
          Alert.alert('Already Connected', err, [{text: 'OK'}]);
          console.log('createConnectionRequest Err ==>33', err);
        },
      ),
    );
  };

  const handleMessageButton = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('recepient_id', slotItem?.host?.id);
    dispatch(
      createConversationRequest(
        params,
        res => {
          setIsLoading(false);
          setIsConnected(true);
          navigation.navigate('Inbox', {item: res?.conversation});
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> 111', err);
        },
      ),
    );
  };

  const handleConfirm = () => {
    setShowAppModal(false);
    setIsLoading(true);
    const params = new FormData();
    params.append('swapper_id', slotItem?.swapper?.id);
    dispatch(
      cancelConnectionRequest(
        params,
        res => {
          setIsLoading(false);
          setIsConnected(false);
          Alert.alert('Connection Cancelled', res?.message, [
            {
              text: 'OK',
              onPress: () => {
                setIsConnected(false);
                navigation.navigate('Home');
              },
            },
          ]);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const openDialScreen = () => {
    let number = '';
    let phoneNum = `+${slotItem?.host?.country_code}${slotItem?.host?.contact}`;
    if (Platform.OS === 'ios') {
      number = `telprompt:${phoneNum}`;
    } else {
      number = `tel:${phoneNum}`;
    }
    Linking.openURL(number);
  };
  const total = (slotItem?.parking_slot?.fees ) + (slotItem?.parking_slot?.amount);
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
          {isConnected ? (
            <Image
              source={
                slotItem?.user_image
                  ? {
                      uri: slotItem?.user_image,
                    }
                  : appImages.car
              }
              style={styles.imgStyle}
            />
          ) : (
            <Image source={appImages.car} style={styles.imgStyle} />
          )}
          <View style={styles.innerView}>
            <Text style={styles.titleTxtStyle}>
              {isConnected
                ? slotItem?.host?.name
                : slotItem?.host?.name?.split(' ')[0] + ' ***'}
            </Text>
            <Text style={styles.bottomText}>
              {isConnected
                ? slotItem?.car_model_name
                : slotItem?.car_model_name?.split(' ')[0]}
            </Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>host</Text>
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
          {isConnected && (
            <MapViewDirections
              strokeWidth={5}
              strokeColor={colors.s7}
              apikey={GOOGLE_MAPS_API_KEY}
              origin={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              onReady={result => {
                const {distance, duration} = result;
                console.log(`Distance: ${distance} km`);
                console.log(`Duration: ${duration} min.`);
                let formattedTime = moment
                  .utc(
                    moment.duration(duration * 60, 'seconds').asMilliseconds(),
                  )
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
          )}
        </MapView>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.boxContainer}>
          <Text style={styles.etaTxtStyle2}>Spot Fare ${total}</Text>
          <Text style={styles.etaTxtStyle}>ETA</Text>
          <Text style={styles.timeTxtStyle}>{time ? time : '00:00:00'}</Text>
          {isConnected && (
            <>
              <View style={styles.dividerView} />
              <View style={styles.innerRowContainer}>
                <Text style={styles.etaTxtStyle}>
                  Note: {slotItem?.parking_slot?.description || 'N/A'}
                </Text>
                <Image
                  source={
                    slotItem?.parking_slot_image
                      ? {uri: slotItem?.parking_slot_image}
                      : appImages.car
                  }
                  style={styles.carImageStyle}
                />
              </View>
            </>
          )}
        </View>
        {!isConnected ? (
          <AppButton
            width={WP('65')}
            title={'Connect'}
            onPress={() => handleConnectButton()}
          />
        ) : (
          <View style={styles.buttonsRow}>
            <AppButton
              width={WP('55')}
              title={'Cancel Request'}
              bgColor={colors.r_gradient}
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
        )}
      </View>
      {showAppModal && (
        <HomeModal
          isCrossButton={true}
          title={'Are you sure you want to\ncancel this spot?'}
          show={showAppModal}
          buttonText="Confirm"
          isTextButton={false}
          onPress={handleConfirm}
          desc={
            'Once cancelled, this spot might be taken by someone else immediately'
          }
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('Home');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default ConnectToHost;
