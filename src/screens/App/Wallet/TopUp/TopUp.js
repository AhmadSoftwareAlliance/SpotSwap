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

// redux stuff
import {useDispatch} from 'react-redux';
import {topUpRequest} from '../../../../redux/actions';

const TopUp = ({navigation}) => {
  const formikRef = useRef();
  const isFocus = useIsFocused(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getAppLaunchLink();
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, [isFocus]);

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
      setIsLoading(false);
      formikRef.current?.resetForm();
      setTimeout(() => {
        setShowAppModal(true);
      }, 500);
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

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <Formik
        innerRef={formikRef}
        initialValues={topUpField}
        onSubmit={values => {
          handleTopUp(values);
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
                Please be advised that money in the wallet is not refundable and
                can’t be withdrawn back. By selecting “Ok” mean you agree to
                this condition.
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
                onPress={() => {
                  handleSubmit();
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
