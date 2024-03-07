import React, {useRef, useState} from 'react';
import {Text, Alert, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  sendMailVS,
  sendMailFormFields,
} from '../../../shared/exporter';
import {Spacer, AppInput, AppButton, AppLoader, AppHeader} from '../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {forgotPassRequest} from '../../../redux/actions';

const ForgotPassword = ({navigation}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const handleSendMail = values => {
    console.log("values",values);
    setIsLoading(true);
    const params = new FormData();
    params.append('email', values?.email);
    dispatch(
      forgotPassRequest(
        params,
        res => {
          setIsLoading(false);
          formikRef.current?.resetForm();
          navigation.navigate('VerificationSent', {mail: values?.email});
        },
        err => {
          setIsLoading(false);
          Alert.alert('Mail Not Sent', err, [
            {
              text: 'OK',
            },
          ]);
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <Formik
        innerRef={formikRef}
        initialValues={sendMailFormFields}
        onSubmit={values => {
          handleSendMail(values);
        }}
        validationSchema={sendMailVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
            <Text style={styles.passTxtStyle}>Forgot Password</Text>
            <Text style={styles.descTxtStyle}>
              Enter your email address so we can send an OTP to recover your
              password
            </Text>
            <Spacer androidVal={WP('20')} iOSVal={WP('20')} />
            <AppInput
              renderErrorMessage
              disableFullscreenUI
              value={values.email}
              blurOnSubmit={false}
              touched={touched.email}
              title="Enter your email"
              errorMessage={errors.email}
              keyboardType="email-address"
              placeholder="lilacmc@gmail.com"
              placeholderTextColor={colors.g2}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
            <AppButton
              title="Send Verification"
              onPress={() => handleSubmit()}
            />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default ForgotPassword;
