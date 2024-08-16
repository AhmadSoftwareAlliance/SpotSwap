import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  AppState,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Alert,
} from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useIsFocused } from '@react-navigation/core';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import {
  HomeModal,
  AppButton,
  AppLoader,
  HomeHeader,
} from '../../../../components';
import {
  WP,
  size,
  colors,
  family,
  appIcons,
  scrWidth,
  scrHeight,
  mapCustomStyle,
  NotificationListener,
} from '../../../../shared/exporter';
import { styles } from './styles';
import {createSpotReq} from '../../../../redux/actions';
// redux stuff
import { useSelector, useDispatch } from 'react-redux';

import {
  saveFCMTokenReq,
  getProfileRequest,
  getCarInfoRequest,
  toggleOnlineStatusRequest,
  updateProfileRequest
} from '../../../../redux/actions';


let watchID;
let count = 1;
const ASPECT_RATIO = scrWidth / scrHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({ navigation }) => {
  const mapRef = useRef(null);
  const isFocus = useIsFocused(null);
  const appState = useRef(AppState.currentState);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [address, setAddress] = useState('');
  const [carImage, setCarImage] = useState('');
  console.log("carImage",carImage);
  
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [hasArrived, setHasArrived] = useState(false);
  const [walletAmount, setWalletAmount] = useState('');
  const [showAppModal, setShowAppModal] = useState(false);
  const [tracksDestChanges, setTracksDestChanges] = useState(true);
  const [showPicTakenModal, setShowPicTakenModal] = useState(false);
  const [tracksOriginChanges, setTracksOriginChanges] = useState(true);
  const [bottom,setBottom] = useState(20)

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setBottom(e.endCoordinates.height)
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setBottom(20)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  // redux stuff
  const dispatch = useDispatch(null);
  const { userInfo } = useSelector(state => state.auth);
  // console.log("userInfo",JSON.stringify(userInfo,null,2));
  const {carInfo,userProfile} = useSelector(state => state.profile);
  // console.log("carInfo home",JSON.stringify(carInfo,null,2));
  // console.log("userProfile at home ",JSON.stringify(userProfile,null,2));
  useEffect(() => {
    if (isFocus) {
      handleStateChange('online');
    }
  }, [isFocus]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        handleStateChange('online');
      } else {
        handleStateChange('offline');
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [appState.current]);

  const handleStateChange = userStatus => {
    const cbSuccess = async res => {
      await AsyncStorage.setItem('walletAmount', res?.wallet_amount);
      setWalletAmount(res?.wallet_amount);
    };
    const cbFailure = res => {
      console.log('Fail => ', res);
    };
    const params = new FormData();
    params.append('current_status', userStatus);
    dispatch(toggleOnlineStatusRequest(params, cbSuccess, cbFailure));
  };

  useEffect(() => {
    NotificationListener(navigation);
    Promise.all[(getUserProfile(), getCarProfile())];
  }, []);
  // useEffect(() => {
  //   NotificationListener(navigation);
  //   Promise.all[(getUserProfile())];
  // }, []);

  useEffect(() => {
    if (isFocus) {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
        askForPermissions();
      }
    }
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [isFocus]);

  const askForPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      getLocation();
      console.log("askForPermissions", askForPermissions);
    }
  };

  const getLocation = async () => {
    // console.log("getLocation called");
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
      console.log("getLocation called1");
    }
    // watchID = Geolocation.getCurrentPosition(
    // console.log("getLocation called2");
    watchID = Geolocation.watchPosition(
      position => {
        console.log("getLocation called3");
        const { latitude, longitude } = position?.coords;
        let mapRegion = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        console.log('mapRegion', mapRegion);
        setRegion(mapRegion);
        // console.log('Watch Position',count);
        if (count === 1) {
          // console.log("count 1 called >>>>>>");
          mapRef?.current?.animateToRegion(mapRegion, 1000);
          Geocoder.from(latitude, longitude)
            .then(json => {
              count = 1;
              // console.log("count 2 called >>>>>>",json.results[0]?.formatted_address);
              var addressComponent = json.results[0]?.formatted_address;
              setAddress(addressComponent);
              // console.log("count 3 called >>>>>>");
              let a = addressComponent.split(',').slice(3, 4);
              let b = addressComponent.split(',').slice(5, 6);
              let c = a.concat(b).join(',');
              setAddress(addressComponent);
              // console.log("count 4 called >>>>>>");
              saveFCMToken(latitude, longitude, c);
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      },
      error => {
        console.log('Error Code ==> ', error.code);
        console.log('Error Msg ==> ', error.message);
      },
      {
        maximumAge: 0,
        timeout: 15000,
        distanceFilter: 1,
        enableHighAccuracy: true,
      },
    );
  };

  const saveFCMToken = async (latitude, longitude, userAddress) => {

    // setIsLoading(true);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const params = new FormData();
    params.append('fcm_token', fcmToken);
    params.append('latitude', latitude);
    params.append('longitude', longitude);
    params.append('address', userAddress || 'No address found');
    dispatch(
      saveFCMTokenReq(
        params,
        res => {
          setIsLoading(false);
          // console.log("save fcm is called0000 >>>>>>>>>",res?.swapper_host_connection);
          if (res?.swapper_host_connection) {
            // console.log("save fcm is called1111 >>>>>>>>>");
            if (res?.swapper_host_connection?.swapper?.id === userInfo?.id) {
              navigation.navigate('ConnectToHost', {
                item: res?.swapper_host_connection,
                connected: 'true',
              });
            } else {
              navigation.navigate('ConnectedToFinder', {
                item: res?.swapper_host_connection,
              });
            }
          }
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>1 ', err);
        },
      ),
    );
  };
 
  const getUserProfile = async() => {
    // setIsLoading(true);
    dispatch(
      getProfileRequest(
        res => {
          console.log("DUCK","getUserProfile o home screen",JSON.stringify(res,null,2));
        //  getCarProfile(res?.user.id)
      
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>2 ', err);
        },
      ),
    );
  };

  const getCarProfile = async () => {
    // setIsLoading(true);
    const params = new FormData();
    params.append('id',carInfo?.id?carInfo?.id: userInfo?.user_car_profile_id);
    // params.append('id', 123);
    dispatch(
      await getCarInfoRequest(
        params,
        res => {
          console.log("get car infi success",JSON.stringify(res,null,2));
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>3 ', err);
        },
      ),
    );
  };

  const handleProceedButton = () => {
    setShowAppModal(false);
    setTimeout(() => {
      openCamera();
    }, 500);
  };

  //Camera Handlers
  const openCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
        setCarImage(image);
        setShowPicTakenModal(true);
      });
    }, 400);
  };

  const handleSaveInfo =() => {
    setIsLoading(true);
    // let {carImage, latitude, longitude, address} = route?.params?.item;

    const params = new FormData();
    params.append('latitude', region.latitude);
    params.append('longitude', region.longitude);
    params.append('address', address || 'Address is not found');
    // params.append('description', values?.discription);
    params.append('description', "");
    // params.append('amount', values?.amount);
    if (carImage) {
      params.append('image', {
        uri: Platform.OS === 'ios' ? carImage?.path : carImage?.path,
        name: carImage?.filename || 'image',
        type: carImage?.mime,
      });
    }
    console.log("form data",JSON.stringify(params,null,2));
    dispatch(
      createSpotReq(
        params,
        res => {
          setIsLoading(false);
          // formikRef.current?.resetForm();
          setTimeout(()=>{
            navigation.replace('ActivateSpot', {
              activated: false,
              slot: res?.parking_slot,
            });
          },1000)
         
        },
        err => {
          setIsLoading(false);
          console.log('Error ==>1111 ', err);
          if (
            err ===
            'You have not any Account Setup for Payment , Please Add it first.'||
            err ===
            'Your Stripe Connect Account data is missing or invalid, Please provide valid data.' ||
          err ===
            'Your Account status is Pending. Please wait, it may take a few minutes.' ||
          err === 'Please Complete your Account Details.'
          ) {
            Alert.alert('Failure', err, [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('Profile', {screen: 'AddPaymentMethod'}),
              },
            ]);
          } else {
            alert(err);
          }
        },
      ),
    );
  };
  return (
    <View style={styles.rootContainer}>
      <AppLoader loading={isLoading} />
      <View style={styles.headerView}>
        <HomeHeader
          isHome={true}
          walletAmount={walletAmount}
          onPress={() => navigation.navigate('Wallet')}
        />
      </View>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        initialRegion={region}
        style={styles.map}
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
            source={appIcons.originIcon}
            style={styles.orginMarkerStyle}
            onLoad={() => setTracksOriginChanges(false)}
          />
        </Marker>
        {destination ? (
          <View>
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              tracksViewChanges={tracksDestChanges}>
              <Image
                fadeDuration={0}
                style={styles.destMarkerStyle}
                source={appIcons.destinationIcon}
                onLoad={() => setTracksDestChanges(false)}
              />
            </Marker>
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
                let meters = result.distance * 1000;
                if (meters < 10) {
                  setDestination('');
                  setHasArrived(true);
                }
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 70,
                    bottom: 70,
                    left: 70,
                    top: 70,
                  },
                });
              }}
              onError={err => console.log('Map Directions Error ==> ', err)}
            />
          </View>
        ) : null}
      </MapView>
      {/* <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            /> */}
      <View style={[styles.bottomView,{bottom}]}>
        {hasArrived && <Text style={styles.txtStyle}>You’ve arrived</Text>}
        <View style={styles.locationsContainer}>
          <View style={styles.innerRow}>
            <Image
              source={appIcons.originIcon}
              style={styles.originIconStlye}
            />
            <Text style={styles.locTxtStyle}>{address}</Text>
          </View>
          <View style={styles.dividerView} />
          <View style={styles.innerRow}>
            <Image source={appIcons.locationIcon} style={styles.locIconStlye} />
            <GooglePlacesAutocomplete
              placeholder="Search for address"
              fetchDetails={true}
              textInputProps={{
                multiline: false,
                placeholderTextColor: colors.w1,
              }}
              GooglePlacesDetailsQuery={{ fields: 'geometry' }}
              styles={{
                textInputContainer: { backgroundColor: 'transparent' },
                textInput: {
                  color: colors.w1,
                  borderRadius: 40,
                  fontSize: size.xsmall,
                  backgroundColor: colors.g7,
                  fontFamily: family.SFProText_Regular,
                },
                description: {
                  color: colors.b1,
                },
                container: {
                  width: '95%',
                  alignSelf: 'center',
                },
              }}
              onFail={err => {
                console.log('[error while auto complete]', err);
              }}
              onPress={(data, details = true) => {
                // 'details' is provided when fetchDetails = true
                setDestination({
                  latitude: parseFloat(details?.geometry?.location?.lat),
                  longitude: parseFloat(details?.geometry?.location?.lng),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                });
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton
            width={WP('45')}
            title={'Find a spot'}
            bgColor={colors.s_gradient}
            borderColor={'transparent'}
            titleTxtStyle={styles.btnTxtStyle}
            // onPress={() => (userProfile?.profile_complete? navigation.navigate('FindSpot'): Alert.alert("",'Go to settings and update Car Info first.', [
            //   {
            //     text: 'OK',
            //     onPress: () => {
            //       // navigation.navigate('Settings');
            //     },
            //   },
            // ]))}
            onPress={() => {
              if (userProfile?.profile_complete) {
                if (walletAmount < 11) {
                  Alert.alert(
                    "",
                    "You don't have sufficient balance to avail slot.\nPlease top-up first.",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          // Optionally navigate to add funds screen or perform another action
                        },
                      },
                    ]
                  );
                } else {
                  navigation.navigate('FindSpot');
                }
              } else {
                Alert.alert(
                  "",
                  "Go to settings and update Car Info first.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Optionally navigate to settings screen or perform another action
                      },
                    },
                  ]
                );
              }
            }}
            />
          
          <View style={styles.btnsSpacer} />
          <AppButton
            width={WP('45')}
            borderColor={'transparent'}
            title={'Make parking\nspot available'}
            titleTxtStyle={styles.btnTxtStyle}
            onPress={() =>(userProfile?.profile_complete?  setShowAppModal(true): Alert.alert("",'Go to settings and update Car Info first.', [
              {
                text: 'OK',
                onPress: () => {
                  // navigation.navigate('Settings');
                },
              },
            ]))}
          />
        </View>
      </View>
      {showAppModal && (
        <HomeModal
          isHome
          buttonText="Proceed"
          show={showAppModal}
          isCrossButton={false}
          title={'Take A Pic!'}
          hideButtonText="Next Time"
          onPress={handleProceedButton}
          desc={'Take a photo of the parking spot/location you are in.'}
          onHide={() => setShowAppModal(false)}
          onPressHide={() => {
            setShowAppModal(false);
            setTimeout(() => {
              handleSaveInfo()
            }, 200);
           
            // navigation.navigate('AddDescription', {
            //   item: {
            //     carImage: '',
            //     latitude: region.latitude,
            //     longitude: region.longitude,
            //     address: address,
            //   },
            // });
          }}
        />
      )}
      {showPicTakenModal && (
        <HomeModal
          buttonText="Continue"
          show={showPicTakenModal}
          isCrossButton={false}
          isTextButton={false}
          title={'Your pic has been saved!'}
          onPress={() => {
            setShowPicTakenModal(false);
            setTimeout(() => {
              handleSaveInfo()
            }, 200);
           
            // navigation.navigate('AddDescription', {
            //   item: {
            //     carImage: carImage,
            //     latitude: region.latitude,
            //     longitude: region.longitude,
            //     address: address,
            //   },
            // });
          }}
          desc={
            'This photo will be used when you make your parking lot available.'
          }
        />
      )}
    </View>
  );
};

export default Home;
