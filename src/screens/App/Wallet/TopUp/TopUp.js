import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Alert, Linking, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {DYNAMIC_LINK} from '@env';
import {useIsFocused} from '@react-navigation/core';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  topUpVS,
  appImages,
  topUpField,
} from '../../../../shared/exporter';
import {
  Spacer,
  AppInput,
  AppModal,
  AppButton,
  AppHeader,
  AppLoader,
} from '../../../../components';
import styles from './styles';
import {BASE_URL} from '@env';
// redux stuff
import {useDispatch} from 'react-redux';
import {topUpRequest} from '../../../../redux/actions';
import {PlatformPay, PlatformPayButton, usePlatformPay} from '@stripe/stripe-react-native';
import { GetToken } from '../../../../shared/utilities/headers';

const TopUp = ({navigation}) => {
  const formikRef = useRef();
  const isFocus = useIsFocused(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [isAmount, setIsAmount] = useState("");
  const [isSport, setIsSpoprt] = useState("");
  console.log("isAmount",isAmount);
  const {
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = usePlatformPay();
  // redux stuff
  const dispatch = useDispatch(null);
 
  useEffect(() => {
    getAppLaunchLink();
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, [isFocus]);
    React.useEffect(() => {
    (async () => {
      const supported = await isPlatformPaySupported();
      setIsSpoprt(supported)
      console.log('Platform Pay Supported:', supported);
    })();
  }, []);
  const getAppLaunchLink = () => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link?.url === DYNAMIC_LINK) {
          console.log('LINK ==> ', link);
        }
      });
  };

  const handleDynamicLink = link => {
    try {
      if (link?.url === DYNAMIC_LINK) {
        console.log('Dynamic LINK ==> ', link?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTopUp = async values => {
    setIsLoading(true);
    var params = new FormData();
    params.append('amount', values?.amount);
    params.append('referrer_code', values?.referralCode);
    const onSuccess = res => {
      console.log("res on topup",JSON.stringify(res,null,2));
      setIsLoading(false);
      formikRef.current?.resetForm();
         pay(res?.topup_response?.client_secret,values?.amount)
      // setTimeout(() => {
      //   setShowAppModal(true);
      // }, 500);
    };
    const onFailure = err => {
      console.log('Error ==> ', err);
      setIsLoading(false);
      if (
        err[0] ===
          'Your Stripe Connect Account data is missing or invalid, Please provide valid data.' ||
        err[0] ===
          'Your Account status is Pending. Please wait, it may take a few minutes.' ||
        err[0] === 'Please Complete your Account Details.'
      ) {
        Alert.alert('Top Up Fail', err[0], [
          {
            text: 'Cancel',
          },
          {
            text: 'Set Up',
            onPress: () => {
              Linking.openURL(err[1]);
            },
          },
        ]);
      } else {
        alert(err);
      }
    };
    dispatch(topUpRequest(params, onSuccess, onFailure));
  };
  const fetchPaymentIntentClientSecret = async (amount) => {
    console.log("fetchPaymentIntentClientSecret amount",amount);
    try {
      const response = await fetch(`${BASE_URL}stripe_connects/create_payment_intent`, {
      // const response = await fetch(`https://admin.spotswap.app/api/v1/stripe_connects/create_payment_intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await GetToken()}`,
        },
        body: JSON.stringify({
          amount:amount,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("response", JSON.stringify(data.client_secret, null, 2));
      const  clientSecret  = data.client_secret;
      console.log("clientSecret>>>", clientSecret);
  
      return clientSecret;
    } catch (error) {
      console.error('Error fetching payment intent client secret:', error);
      throw error;
    }
  };
  
  const pay = async values => {
    console.log("pay amount ",values?.amount);
    try {
      const clientSecret = await fetchPaymentIntentClientSecret(values?.amount);
      const { error, paymentIntent } = await confirmPlatformPayPayment(
        clientSecret,
        {
          applePay: {
            cartItems: [
              {
                label: 'TopUp',
                amount:values?.amount,
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            // requiredShippingAddressFields: [
            //   PlatformPay.ContactField.PostalAddress,
            // ],
            // requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
          },
          googlePay: {

            cartItems: [
              {
                label: 'TopUp',
                amount:values?.amount,
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            testEnv: true,
            merchantName: 'merchant.com.SpotSwap',
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            // billingAddressConfig: {
            //   format: PlatformPay.BillingAddressFormat.Full,
            //   isPhoneNumberRequired: true,
            //   isRequired: true,
            // },
          },
        }
        
      );
  
      if (error) {
        console.error('Payment error:', error);
        // handle error
      } else {
        setTimeout(() => {
        setShowAppModal(true);
      }, 500);
        // Alert.alert('Success', 'Check the logs for payment intent details.');
        console.log('PaymentIntent:', JSON.stringify(paymentIntent, null, 2));
        updateWallet(values?.amount);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };
  
  const updateWallet = async (amount) => {
    console.log("updateWallet amount ",amount);
    try {
      const response = await fetch(`${BASE_URL}stripe_connects/update_wallet`, {
      // const response = await fetch(`https://admin.spotswap.app/api/v1/stripe_connects/update_wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await GetToken()}`,
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });
  
      if (!response.ok) {
        throw new Error(` update waalett HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("response", JSON.stringify(data, null, 2));
     
  
      return;
    } catch (error) {
      console.error('update waalett', error);
      throw error;
    }
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <Formik
        innerRef={formikRef}
        initialValues={topUpField}
        onSubmit={values => {
          // handleTopUp(values);
          pay(values);
        }}
        validationSchema={topUpVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewStyle}
            showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
              <Text style={styles.alertTxtStyle}>Alert</Text>
              <Text style={styles.descTxtStyle}>
                By adding amount to your SwapSpot Wallet, you will enjoy the
                privilege of having a quick connection between SpotSwap users.
                {'\n'}
                {'\n'}
                {/* Please be advised that money in the wallet is not refundable and
                can’t be withdrawn back. By selecting “Ok” mean you agree to
                this condition. */}
                Please be advised that money in the wallet is not refundable but you can withdraw back. Minimum withdrawal limit is $50
              </Text>
              <Spacer androidVal={WP('10')} iOSVal={WP('10')} />
              <AppInput
                placeholder="Enter Amount"
                title="Enter Amount"
                phTextColor={colors.white}
                touched={touched.amount}
                errorMessage={errors.amount}
                renderErrorMessage
                onBlur={() => setFieldTouched('amount')}
                value={values.amount}
                onChangeText={handleChange('amount')}
              />
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <AppInput
                placeholder="Enter Referral Code"
                title="Referral Code (Optional)"
                phTextColor={colors.white}
                touched={touched.referralCode}
                errorMessage={errors.referralCode}
                renderErrorMessage
                onBlur={() => setFieldTouched('referralCode')}
                value={values.referralCode}
                onChangeText={handleChange('referralCode')}
              />
              <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
            </View>
            <View style={styles.bottomView}>
              <AppButton
                title="Submit"
                onPress={() => {isSport?
                  handleSubmit()
                  // pay();

                  :Alert.alert("This device is not supported for Apple Pay.")
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
      {showAppModal && (
        <AppModal
          show={showAppModal}
          title={'Amount is\nSuccessfully added!'}
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('Wallet');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default TopUp;
