import React, {useRef, useState, useEffect} from 'react';
import {Text, Image, Alert, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appLogos,
  appImages,
  socialRegisterVS,
  socialRegisterFormFields,
} from '../../../shared/exporter';
import {Spacer, AppInput, AppButton, AppLoader} from '../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {updateSocialProfileReq} from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocialRegister = ({navigation, route}) => {
  const paramdata = route?.params?.item;
  const formikRef = useRef();
  const [cca2, setcca2] = useState('US');
  const [country, setcountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('1');
  const [showCountryPicker, setshowCountryPicker] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const handleRegister = values => {
    setIsLoading(true);
    const params = new FormData();
    params.append('name', values?.name);
    params.append('contact', values?.number);
    params.append('country_code', countryCode);
    params.append('referrer_code', values?.referralCode);
    dispatch(
      updateSocialProfileReq(
        params,
       async res => {
          setIsLoading(false);
          formikRef.current?.resetForm();
          // navigation.navigate('AddCarInfo');
          await AsyncStorage.setItem('login', 'true');
          setTimeout(() => {
            navigation.replace('App');
          }, 200);
        },
        err => {
          setIsLoading(false);
          Alert.alert('Update Fail', err?.split(', ').join('\n'), [
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
        initialValues={socialRegisterFormFields}
        onSubmit={values => {
          handleRegister(values);
        }}
        validationSchema={socialRegisterVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => {
          useEffect(() => {
            let item = route?.params?.item;
            if(item.name=="apple don't provide name"){
              setFieldValue('name',"");
            }else{
              setFieldValue('name', item?.name);
            }
            
            setFieldValue('email', item?.email);
          }, [route]);

          return (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={styles.regTxtStyle}
                onPress={() => navigation.navigate('Login')}>
                Sign In
              </Text>
              <Image
                resizeMode="contain"
                source={appLogos.appLogo}
                style={styles.logoStyle}
              />
              <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
              {/* {console.log(values.name,"item",paramdata.name)} */}
              <AppInput
                editable={paramdata.name=="apple don't provide name"?true:false}
                renderErrorMessage
                disableFullscreenUI
                value={values.name}
                blurOnSubmit={false}
                touched={touched.name}
                title="User name"
                errorMessage={errors.name}
                placeholder="Enter your name"
                placeholderTextColor={colors.g2}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <AppInput
                editable={false}
                renderErrorMessage
                disableFullscreenUI
                value={values.email}
                blurOnSubmit={false}
                touched={touched.email}
                title="User email"
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
              <AppButton
                title="Update Profile"
                onPress={() => handleSubmit()}
              />
              <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </ImageBackground>
  );
};

export default SocialRegister;
