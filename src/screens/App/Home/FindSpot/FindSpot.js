import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  Platform,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {AppButton, AppLoader, HomeHeader} from '../../../../components';
import {
  WP,
  scrWidth,
  appIcons,
  scrHeight,
  appImages,
  mapCustomStyle,
} from '../../../../shared/exporter';
import {styles} from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {getAllSpotsReq} from '../../../../redux/actions';

const ASPECT_RATIO = scrWidth / scrHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const FindSpot = ({navigation}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [tracksOriginChanges, setTracksOriginChanges] = useState(true);
  const [tracksFindersChanges, setTracksFindersChanges] = useState(true);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      askForPermissions();
    }
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
    setIsLoading(true);
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
        // Hit get all spots api
        getAllSpots(latitude, longitude);
      },
      error => {
        setIsLoading(false);
        console.log('Error Code ==> ', error.code);
        console.log('Error Msg ==> ', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getAllSpots = (latitude, longitude) => {
    // console.log(latitude,">>>>>>",longitude);
    const params = new FormData();
    params.append('latitude', latitude);
    params.append('longitude', longitude);
    dispatch(
      getAllSpotsReq(
        params,
        res => {
          console.log("res>>>>",JSON.stringify(res,null,2));
          setIsLoading(false);
          setParkingSlots(res?.parking_slots);
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
          isHome={false}
          title="Find Spot"
          onPress={() => navigation.navigate('Wallet')}
        />
      </View>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          zoomEnabled={true}
          initialRegion={region}
          style={styles.mapStyle}
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
              source={appIcons.currentLoc}
              style={styles.originMarkerStyle}
              onLoad={() => setTracksOriginChanges(false)}
            />
          </Marker>
          {parkingSlots &&
            parkingSlots?.map(marker => (
              <Marker
                coordinate={{
                  latitude: marker?.parking_slot?.latitude,
                  longitude: marker?.parking_slot?.longitude,
                }}
                tracksViewChanges={tracksFindersChanges}
                onPress={() =>
                  navigation.navigate('ConnectToHost', {
                    item: marker,
                    connected: 'false',
                  })
                }>
                <TouchableOpacity style={styles.markerContainer}>
                  <Image
                    fadeDuration={0}
                    source={
                      marker?.car_image
                        ? {uri: marker?.car_image}
                        : appIcons.spotIcon
                    }
                    style={styles.markerStyle}
                    onLoad={() => setTracksFindersChanges(false)}
                  />
                </TouchableOpacity>
              </Marker>
            ))}
        </MapView>
      </View>
      {/* {console.log(">>>parkingSlots",parkingSlots.length)} */}
      <View style={styles.bottonContainer}>
        <AppButton
          width={WP('65')}
          title={'Find Spot'}
          onPress={() =>parkingSlots.length==0?Alert.alert("Slot not available"): getLocation()}
        />
      </View>
    </ImageBackground>
  );
};

export default FindSpot;
