import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Platform,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
import {WebView} from 'react-native-webview';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appImages, appLogos, WP} from '../../../../shared/exporter';
import {AppButton, Spacer, HomeModal, AppLoader} from '../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {
  savePayPalResReq,
  getApprovalURLReq,
  availParkingSpotReq,
} from '../../../../redux/actions';

const TransactionScreen = ({navigation, route}) => {
  const [data, setData] = useState('');
  const [dateTime] = useState(new Date());
  const [address, setAddress] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [approvalURL, setApprovalURL] = useState('');
  const [showAppModal, setShowAppModal] = useState(false);
  const [availableModal, setAvailableModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    setAvailableModal(true);
    let {item} = route?.params;
    setData(item);
    setPaymentType(item?.swapper_payment_type);
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
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position?.coords;
        Geocoder.from(latitude, longitude)
          .then(json => {
            var formattedAddress = json.results[6]?.formatted_address;
            setAddress(formattedAddress);
          })
          .catch(error => {
            console.log('error', error);
          });
      },
      error => {
        console.log('Error Code ==> ', error.code);
        console.log('Error Msg ==> ', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const Row = ({title, val}) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={styles.hTxtStyle}>{title}</Text>
        <Text style={styles.valTxtStyle(title)}>{val}</Text>
      </View>
    );
  };

  const handlePayment = () => {
    console.log("handlePayment called");
    setIsLoading(true);
    const params = new FormData();
    params.append('amount', '11');
    dispatch(
      availParkingSpotReq(
        params,
        res => {
          console.log("res.message>>",JSON.stringify(res,null,2));
          if(res.message== "Request failed with status code 422"){
            Alert.alert("You have Insufficient Balance in your Wallet please add first.")
            setIsLoading(false);
          }else{
            console.log("res on handle payment ",JSON.stringify(res.message,null,2));
            setIsLoading(false);
            setTimeout(() => {
              setIsPaid(true);
            }, 500);
          }
         
        },
        err => {
          console.log("respos avail parking",err);
          setIsLoading(false);
          if (err === 'You have Insufficient Balance in your Wallet.') {
            Alert.alert('Failure', err, [
              {text: 'Cancel'},
              {
                text: 'Add',
                onPress: () => {
                  if (paymentType === 'wallet') {
                    navigation.navigate('Wallet');
                  } else {
                    navigation.navigate('Profile', {
                      screen: 'AddPaymentMethod',
                    });
                  }
                },
              },
            ]);
          } else if (err?.includes('Insufficient funds in Stripe account.')) {
            Alert.alert(
              'Failure',
              'You have Insufficient Balance in your Card.',
              [
                {text: 'Cancel'},
                {
                  text: 'Add',
                  onPress: () => {
                    if (paymentType === 'wallet') {
                      navigation.navigate('Wallet');
                    } else {
                      navigation.navigate('Profile', {
                        screen: 'AddPaymentMethod',
                      });
                    }
                  },
                },
              ],
            );
          } else {
            console.log('Err ==> ', err);
            alert(err);
          }
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const handlePayPalPayment = () => {
    setIsLoading(true);
    dispatch(
      getApprovalURLReq(
        res => {
          setIsLoading(false);
          setApprovalURL(res?.links[1]?.href);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>11 ', err);
        },
      ),
    );
  };

  const _onNavigationStateChange = webViewState => {
    if (webViewState.url.includes('https://example.com/')) {
      setApprovalURL('');
      setIsLoading(true);
      const extractURL = webViewState.url;
      // get paymentId & payerId from the URL
      const res = extractURL.split('=');
      const paymentId = res[1].slice(0, -6);
      const payerId = res[3];
      savePayPalRes(payerId, paymentId);
      console.log(payerId,">>>>>>>>>>>>>>>>",paymentId);
    }
  };

  const savePayPalRes = (payerId, paymentId) => {
    const params = new FormData();
    params.append('account_id', payerId);
    params.append('payment_id', paymentId);
    dispatch(
      savePayPalResReq(
        params,
        res => {
          setIsLoading(false);
          setTimeout(() => {
            setIsPaid(true);
          }, 500);
        },
        err => {
          setIsLoading(false);
          if (err === 'You have Insufficient Balance in your Wallet.') {
            Alert.alert('Failure', err, [
              {text: 'Cancel'},
              {
                text: 'Add',
                onPress: () => {
                  if (paymentType === 'wallet') {
                    navigation.navigate('Wallet');
                  } else {
                    navigation.navigate('Profile', {
                      screen: 'AddPaymentMethod',
                    });
                  }
                },
              },
            ]);
          } else {
            alert(err);
          }
          console.log('Err ==>oo ', err);
        },
      ),
    );
  };

  return approvalURL ? (
    <SafeAreaView style={styles.webViewContainer}>
      <WebView
        style={styles.webViewStyle}
        source={{uri: approvalURL}}
        onNavigationStateChange={webViewState =>
          _onNavigationStateChange(webViewState)
        }
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <AppLoader loading={isLoading} />}
      />
    </SafeAreaView>
  ) : (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.contentContainer}>
          <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
          <Image source={appLogos.textLogo} style={styles.logoStyle} />
          <Text style={styles.paymentTxtStyle}>
            {isPaid ? 'Transfer Successful' : 'Pay this to your host'}
          </Text>
          <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
          <View style={styles.boxContainer}>
            <View style={styles.rowContainer}>
              <Image
                source={
                  data?.user_image ? {uri: data?.user_image} : appImages.car
                }
                style={styles.imgStyle}
              />
              <View style={styles.innerView}>
                <Text style={styles.titleTxtStyle}>{data?.host?.name}</Text>
                <Text style={styles.bottomText}>{data?.car_model_name}</Text>
              </View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>host</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxView}>
            <Row title="Date" val={moment(dateTime).format('ll')} />
            <Row title="Time" val={moment(dateTime).format('LT')} />
            <Row title="Location" val={address} />
          </View>
          <View style={styles.boxView}>
            <Row title="Swapper Fee" val="$10.00" />
            <Row title="SpotSwap Fee" val="$1.00" />
            <Row title="Total" val="$11.00" />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        {isPaid ? (
          <AppButton title="Done" onPress={() => setShowAppModal(true)} />
        ) : (
          <AppButton
            title="Pay $11.00"
            onPress={() => {
              paymentType === 'paypal'
                ? handlePayPalPayment()
                : handlePayment();
            }}
          />
        )}
      </View>
      {availableModal && (
        <HomeModal
          show={availableModal}
          isTextButton={false}
          buttonText="Confirm"
          isCrossButton={true}
          title={'Parking will be available'}
          onPress={() => {
            setAvailableModal(false);
          }}
          desc={`${data?.host?.name} is leaving the parking slot, would you like to take it?`}
          onPressHide={() => {
            setAvailableModal(false);
            navigation.replace('Home');
          }}
        />
      )}
      {showAppModal && (
        <HomeModal
          buttonText="Yes"
          show={showAppModal}
          isCrossButton={true}
          isTextButton={false}
          title={'You arrived!'}
          onPress={() => {
            setShowAppModal(false);
            navigation.navigate('Home');
          }}
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('Home');
          }}
          desc={`You arrived at the location of ${data?.host?.name}`}
        />
      )}
    </ImageBackground>
  );
};

export default TransactionScreen;
