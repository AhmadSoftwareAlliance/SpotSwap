import React from 'react';
import {Text, ImageBackground} from 'react-native';
import {WP, appImages} from '../../../shared/exporter';
import {Spacer, AppButton} from '../../../components';
import styles from './styles';

const PasswordUpdated = ({navigation}) => {
  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
      <Text style={styles.passTxtStyle}>Password Updated</Text>
      <Text style={styles.descTxtStyle}>
        Your password has now been updated, kindly go back to login page and
        sign in
      </Text>
      <Spacer androidVal={WP('22')} iOSVal={WP('22')} />
      <AppButton title="Sign in" onPress={() => navigation.navigate('Login')} />
    </ImageBackground>
  );
};

export default PasswordUpdated;
