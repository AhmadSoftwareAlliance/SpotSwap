import React from 'react';
import {Text, ImageBackground} from 'react-native';
import {WP, appImages} from '../../../shared/exporter';
import {Spacer, AppButton} from '../../../components';
import styles from './styles';

const Welcome = ({navigation}) => {
  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
      <Text style={styles.passTxtStyle}>Welcome!</Text>
      <Text style={styles.descTxtStyle}>Account has been created.</Text>
      <Spacer androidVal={WP('22')} iOSVal={WP('22')} />
      <AppButton title="Sign in" onPress={() => navigation.navigate('Login')} />
    </ImageBackground>
  );
};

export default Welcome;
