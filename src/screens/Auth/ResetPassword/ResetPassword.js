import React, {useRef, useState} from 'react';
import {Text, Alert, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  resetPassVS,
  resetPassFormFields,
} from '../../../shared/exporter';
import {Spacer, AppInput, AppButton, AppLoader, AppHeader} from '../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {resetPassRequest} from '../../../redux/actions';

const ResetPassword = ({navigation, route}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const handleUpdatePassword = values => {
    setIsLoading(true);
    const params = new FormData();
    params.append('email', route?.params?.mail);
    params.append('password', values?.password);
    params.append('password_confirmation', values?.confirmPassword);
    dispatch(
      resetPassRequest(
        params,
        res => {
          setIsLoading(false);
          Alert.alert('Updated', res?.message, [
            {
              text: 'OK',
              onPress: () => {
                formikRef.current?.resetForm();
                navigation.navigate('PasswordUpdated');
              },
            },
          ]);
        },
        err => {
          setIsLoading(false);
          Alert.alert('Reset Fail', err, [
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
        initialValues={resetPassFormFields}
        onSubmit={values => {
          handleUpdatePassword(values);
        }}
        validationSchema={resetPassVS}>
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
            <Text style={styles.passTxtStyle}>Create New Password</Text>
            <Text style={styles.descTxtStyle}>
              Set your new password for recovery
            </Text>
            <Spacer androidVal={WP('20')} iOSVal={WP('20')} />
            <AppInput
              secureTextEntry
              bottom={WP('3')}
              renderErrorMessage
              disableFullscreenUI
              blurOnSubmit={false}
              value={values.password}
              touched={touched.password}
              errorMessage={errors.password}
              onSubmitEditing={handleSubmit}
              title="Enter your new password"
              placeholderTextColor={colors.g2}
              placeholder="New password"
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
              title="Confirm new password"
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
            <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
            <AppButton title="Create Password" onPress={() => handleSubmit()} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default ResetPassword;
