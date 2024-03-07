import React, {useRef, useState} from 'react';
import {Text, View, Alert, ImageBackground} from 'react-native';
import {
  Cursor,
  CodeField,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WP, appImages} from '../../../shared/exporter';
import {Spacer, AppButton, AppLoader, AppHeader} from '../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {verifyOTPRequest, resendOTPRequest} from '../../../redux/actions';

const VerifyOTP = ({navigation, route}) => {
  const ref = useRef();
  const [value, setValue] = useState('');
  const [email] = useState(route?.params?.mail);
  const [isLoading, setIsLoading] = useState(false);
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // redux stuff
  const dispatch = useDispatch(null);

  const handleVerifyOTP = () => {
    if (value === '') {
      Toast.show('Please enter an OTP.', Toast.SHORT, ['UIAlertController']);
    } else if (value.length < 6) {
      Toast.show('Please enter complete OTP.', Toast.SHORT, [
        'UIAlertController',
      ]);
    } else {
      verifyTheOTP();
    }
  };

  const verifyTheOTP = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('otp', value);
    params.append('email', email);
    dispatch(
      verifyOTPRequest(
        params,
        res => {
          setIsLoading(false);
          setValue('');
          navigation.navigate('ResetPassword', {mail: email});
        },
        err => {
          setIsLoading(false);
          Alert.alert('Verification Fail', err, [
            {
              text: 'OK',
            },
          ]);
        },
      ),
    );
  };

  const resendOTP = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('email', email);
    dispatch(
      resendOTPRequest(
        params,
        res => {
          setIsLoading(false);
          setValue('');
          Alert.alert(
            'Sent',
            'OTP has been sent to your entered email address',
            [
              {
                text: 'OK',
              },
            ],
          );
        },
        err => {
          setIsLoading(false);
          Alert.alert('Verification Fail', err, [
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
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
        <Text style={styles.passTxtStyle}>Enter OTP</Text>
        <Text style={styles.descTxtStyle}>
          Please enter your verification code sent to your {email}
        </Text>
        <Spacer androidVal={WP('15')} iOSVal={WP('15')} />
        <CodeField
          ref={ref}
          value={value}
          cellCount={6}
          {...codeFieldProps}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={val => setValue(val)}
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={styles.cellStyle}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.txtStyle}>
                {symbol || (isFocused ? <Cursor /> : '0')}
              </Text>
            </View>
          )}
        />
        <Spacer androidVal={WP('20')} iOSVal={WP('20')} />
        <Text style={styles.notReceivedTxtStyle}>
          Didn’t receive a code?{' '}
          <Text style={styles.resendTxtStyle} onPress={() => resendOTP()}>
            Resend
          </Text>
        </Text>
        <Spacer androidVal={WP('21')} iOSVal={WP('21')} />
        <AppButton title="Submit" onPress={() => handleVerifyOTP()} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default VerifyOTP;
