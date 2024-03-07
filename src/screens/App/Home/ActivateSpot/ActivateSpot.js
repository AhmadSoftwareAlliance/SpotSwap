import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {AppButton, AppLoader, HomeHeader} from '../../../../components';
import {
  WP,
  scrWidth,
  appIcons,
  scrHeight,
  appImages,
  mapCustomStyle,
  colors,
} from '../../../../shared/exporter';
import {styles} from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {getAllFindersReq, activateSpotReq} from '../../../../redux/actions';

const ASPECT_RATIO = scrWidth / scrHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ActivateSpot = ({navigation, route}) => {
  const mapRef = useRef(null);
  const isFocus = useIsFocused(null);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [allFinders, setAllFinders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  console.log("isActivated",isActivated);
  const [tracksSlotsChanges, setTracksSlotsChanges] = useState(true);
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
    console.log("useffect called on active screen");
    setIsActivated(route?.params?.activated);
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      askForPermissions();
    }
  }, [isFocus]);

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
    Geolocation.getCurrentPosition(
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
        // Hit get all finders api
        getAllFinders(latitude, longitude);
      },
      error => {
        console.log('Error Code ==> ', error.code);
        console.log('Error Msg ==> ', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getAllFinders = (latitude, longitude) => {
    setIsLoading(true);
    const params = new FormData();
    params.append('latitude', latitude);
    params.append('longitude', longitude);
    dispatch(
      getAllFindersReq(
        params,
        res => {
          setIsLoading(false);
          setAllFinders(res?.finders);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const activateSpot = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('id', route?.params?.slot?.id);
    dispatch(
      activateSpotReq(
        params,
        res => {
          console.log("res on active slot",JSON.stringify(res,null,2));
          setIsLoading(false);
          setIsActivated(true);
          // setTimeout(()=>{
          //   navigation.navigate("Home")
          // },200)
         
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
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
      {/* <View style={styles.boxContainer}>
        <Text style={styles.txtStyle}>
          Please wait while the app is searching...
        </Text>
        <Text style={styles.timeTxtStyle}>1:58</Text>
      </View> */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          zoomEnabled={true}
          initialRegion={region}
          style={styles.mapStyle}
          followUserLocation={true}
          provider={PROVIDER_GOOGLE}
          userLocationCalloutEnabled={true}
          customMapStyle={mapCustomStyle}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            tracksViewChanges={tracksOriginChanges}>
            <Image
              fadeDuration={0}
              source={appIcons.destinationIcon}
              style={styles.markerStyle}
              onLoad={() => setTracksOriginChanges(false)}
            />
          </Marker>
          {allFinders &&
            allFinders?.map(marker => (
              <Marker
                coordinate={{
                  latitude: marker?.latitude,
                  longitude: marker?.longitude,
                }}
                tracksViewChanges={tracksSlotsChanges}>
                <Image
                  fadeDuration={0}
                  source={appIcons.finderMarker}
                  style={styles.markerStyle}
                  onLoad={() => setTracksSlotsChanges(false)}
                />
              </Marker>
            ))}
        </MapView>
      </View>
      <View style={styles.bottonContainer}>
        <View style={styles.btnsRowContainer}>
          <AppButton
            width={WP('44')}
            title={'Refresh'}
            bgColor={colors.r_gradient}
            onPress={() => getLocation()}
            titleTxtStyle={styles.titleTxtStyle}
          />
          <AppButton
            width={WP('44')}
            disabled={isActivated}
            title={'Activate Spot'}
            onPress={() => activateSpot()}
            titleTxtStyle={styles.titleTxtStyle}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ActivateSpot;
