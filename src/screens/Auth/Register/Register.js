import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appIcons,
  appLogos,
  appImages,
  registerVS,
  registerFormFields,
} from '../../../shared/exporter';
import {Spacer, AppInput, AppButton, AppLoader, AppHeader} from '../../../components';
import styles from './styles';
import appleAuth from '@invertase/react-native-apple-authentication';
// redux stuff
import {useDispatch} from 'react-redux';
import {signUpRequest, socialLoginRequest} from '../../../redux/actions';

const Register = ({navigation}) => {
  const formikRef = useRef();
  const [cca2, setcca2] = useState('US');
  const [country, setcountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('1');
  const [showCountryPicker, setshowCountryPicker] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const handleRegister = values => {
    console.log("signupcall");
    setIsLoading(true);
    const params = new FormData();
    params.append('name', values?.name);
    params.append('email', values?.email);
    params.append('contact', values?.number);
    params.append('country_code', countryCode);
    params.append('password', values?.password);
    params.append('referrer_code', values?.referralCode);
    console.log("signup formdata",params);
    dispatch(
      signUpRequest(
        params,
       async res => {
          console.log("res on register",res);
          setIsLoading(false);
          formikRef.current?.resetForm();
          if(Platform.OS=="ios"){
            await AsyncStorage.setItem('login', 'true');
            setTimeout(() => {
              navigation.replace('App');
            }, 1000);
          }else{
            // navigation.navigate('AddCarInfo');
            await AsyncStorage.setItem('login', 'true');
            setTimeout(() => {
              navigation.replace('App');
            }, 500);
          }
         
        },
        err => {
          setIsLoading(false);
          Alert.alert('Signup Fail', err?.split(', ').join('\n'), [
            {
              text: 'OK',
            },
          ]);
        },
      ),
    );
  };

  const handleGoogleLogin = async () => {

    try {
      // await GoogleSignin.signOut();
      setIsLoading(true);
      // Get the users ID token
      await GoogleSignin.hasPlayServices();
      console.log('okkkkk')
      const { idToken } = await GoogleSignin.signIn();
      console.log("idToken", idToken);
      if (idToken) {
        handleSocialLogin('google', idToken);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
      console.log("error code ", error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setIsLoading(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleFBLogin = () => {
    try {
      LoginManager.logOut();
      if (Platform.OS === 'android') {
        LoginManager.setLoginBehavior('web_only');
      }
      // Attempt a login using the Facebook login dialog asking for default permissions.
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(res => {
          console.log('[Permission Granted]', res);
          if (res?.isCancelled) {
            console.log('User canceled login');
          } else {
            AccessToken.getCurrentAccessToken()
              .then(token => {
                handleSocialLogin('facebook', token?.accessToken);
              })
              .catch(error => console.log('error', error));
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log('[facebook err]', err);
    }
  };

  const handleAppleLogin =async () => {
    // performs login request
    try {
     const appleAuthRequestResponse = await appleAuth.performRequest({
         requestedOperation: appleAuth.Operation.LOGIN, // Note: it appears putting FULL_NAME first is important, see issue #293
         requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
     });
     const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user,);
     // use credentialState response to ensure the user is authenticated
     if (credentialState === appleAuth.State.AUTHORIZED) {
         // user is authenticated
         console.log("useeeeee",JSON.stringify(appleAuthRequestResponse,null,2));
        await handleSocialLogin('apple', appleAuthRequestResponse.identityToken);
        
     }
 } catch (e) {
     setIsLoading(false);
     console.log("err",e.message);
     // Toast.showWithGravity(e.message, Toast.SHORT, Toast.BOTTOM);
 }
 };

 const handleSocialLogin = (provider, token) => {
  setIsLoading(true);
  const params = new FormData();
  params.append('token', token);
  params.append('provider', provider);
  dispatch(
    socialLoginRequest(
      params,
      async res => {
        console.log("response on social ", JSON.stringify(res, null, 2));
        setIsLoading(false);
        if (!res?.user?.is_info_complete) {
          if(Platform.OS==="ios"){
            await AsyncStorage.setItem('login', 'true');
            setTimeout(() => {
              navigation.replace('App');
            }, 1000);
          }else{
            navigation.navigate('SocialRegister', {item: res?.user});
          }
        } else {
          if (res?.user?.profile_complete) {
            await AsyncStorage.setItem('login', 'true');
            setTimeout(() => {
              navigation.replace('App');
            }, 1000);
          } else {
            // navigation.navigate('AddCarInfo');
            await AsyncStorage.setItem('login', 'true');
            setTimeout(() => {
              navigation.replace('App');
            }, 500);
          }
        }
      },
      err => {
        setIsLoading(false);
        Alert.alert('Login Fail', err, [
          {
            text: 'OK',
          },
        ]);
      },
    ),
  );
};

  const setCountryValue = val => {
    setCountryCode(val.callingCode[0]);
    setcca2(val.cca2);
    setcountry(val);
    setshowCountryPicker(false);
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
     
      <Formik
        innerRef={formikRef}
        initialValues={registerFormFields}
        onSubmit={values => {
          handleRegister(values);
        }}
        validationSchema={registerVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.signinTextView}>
           <AppHeader onBackPress={() => navigation.goBack()} />
           <Text
              style={styles.regTxtStyle}
              onPress={() => navigation.navigate('Login')}>
              Sign In
            </Text>
           </View>
            <Image
              resizeMode="contain"
              source={appLogos.appLogo}
              style={styles.logoStyle}
            />
            <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
            <AppInput
              renderErrorMessage
              disableFullscreenUI
              value={values.name}
              blurOnSubmit={false}
              touched={touched.name}
              title="Enter your name"
              errorMessage={errors.name}
              placeholder="Enter your name"
              placeholderTextColor={colors.g2}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <AppInput
              renderErrorMessage
              disableFullscreenUI
              value={values.email}
              blurOnSubmit={false}
              touched={touched.email}
              title="Enter your email"
              errorMessage={errors.email}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={colors.g2}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <AppInput
              leftIcon
              cca2={cca2}
              countryInput
              renderErrorMessage
              disableFullscreenUI
              blurOnSubmit={false}
              autoCapitalize="none"
              value={values.number}
              touched={touched.number}
              keyboardType={'phone-pad'}
              title={'Enter phone number'}
              placeholder={'000 0000 000'}
              errorMessage={errors.number}
              onChangeText={handleChange('number')}
              onBlur={() => setFieldTouched('number')}
              onSelect={val => {
                setCountryValue(val);
              }}
              countryCode={countryCode}
              country={country}
              onPressCountryPicker={() => {
                setshowCountryPicker(true);
              }}
              countryPicker={showCountryPicker}
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <AppInput
              secureTextEntry
              bottom={WP('3')}
              renderErrorMessage
              disableFullscreenUI
              blurOnSubmit={false}
              value={values.password}
              touched={touched.password}
              title="Enter password"
              errorMessage={errors.password}
              onSubmitEditing={handleSubmit}
              placeholderTextColor={colors.g2}
              placeholder="Enter password"
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              rightIcon={
                <Icon
                  name={'eye'}
                  type={'feather'}
                  size={18}
                  color={colors.g20}
                />
              }
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <AppInput
              secureTextEntry
              bottom={WP('3')}
              renderErrorMessage
              disableFullscreenUI
              blurOnSubmit={false}
              title="Confirm password"
              value={values.confirmPassword}
              touched={touched.confirmPassword}
              errorMessage={errors.confirmPassword}
              onSubmitEditing={handleSubmit}
              placeholderTextColor={colors.g2}
              placeholder="Confirm password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}
              rightIcon={
                <Icon
                  name={'eye'}
                  type={'feather'}
                  size={18}
                  color={colors.g20}
                />
              }
            />
            <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
            <AppInput
              renderErrorMessage
              disableFullscreenUI
              value={values.referralCode}
              blurOnSubmit={false}
              touched={touched.referralCode}
              title="Enter referral code (optional)"
              errorMessage={errors.referralCode}
              placeholder="Enter here"
              placeholderTextColor={colors.g2}
              onChangeText={handleChange('referralCode')}
              onBlur={() => setFieldTouched('referralCode')}
            />
            <Spacer androidVal={WP('9')} iOSVal={WP('9')} />
            <AppButton title="Create Account" onPress={() => handleSubmit()} />
            <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
            <View style={styles.orViewContainer}>
              <View style={styles.lineView} />
              <Text style={styles.orTxtStyle}>or</Text>
              <View style={styles.lineView} />
            </View>
            <Spacer androidVal={WP('10')} iOSVal={WP('10')} />
            <View style={styles.iconContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleGoogleLogin()}>
                <Image
                  resizeMode="contain"
                  source={appIcons.googleIcon}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleFBLogin()}>
                <Image
                  resizeMode="contain"
                  source={appIcons.fbIcon}
                  style={styles.iconStyle}
                />
              </TouchableOpacity> */}
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleAppleLogin()}>
                  <Image
                    resizeMode="contain"
                    source={appIcons.appleIcon}
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Spacer androidVal={WP('21')} iOSVal={WP('21')} />
            <Text style={styles.descTxtStyle}>
              By signing in you agree to our{' '}
              <Text style={{color:'#0070CF'}} onPress={() => navigation.navigate('TermsConditions')}>
                Terms & Condition
              </Text>
              {'\n'}and{' '}
              <Text style={{color:'#0070CF'}} onPress={() => navigation.navigate('PrivacyPolicy')}>
                Privacy Policy{' '}
              </Text>
              Conditions
            </Text>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default Register;
