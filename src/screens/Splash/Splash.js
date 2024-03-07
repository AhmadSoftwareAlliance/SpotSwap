import React, {useEffect} from 'react';
import {Text, Image, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestPermission} from '../../shared/exporter';
import {appImages, appLogos} from '../../shared/theme/assets';
import styles from './styles';

const Splash = ({navigation}) => {
  useEffect(() => {
    handleAppEntry();
    requestPermission();
  }, []);

  const handleAppEntry = async () => {
    const isWalkthrough = await AsyncStorage.getItem('walkthrough');
    const isLogin = await AsyncStorage.getItem('login');
    setTimeout(() => {
      if (isWalkthrough === 'true') {
        if (isLogin === 'true') {
          navigation.replace('App');
        } else {
          navigation.replace('Auth');
        }
      } else {
        navigation.replace('Walkthrough');
      }
    }, 2000);
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.splash_bg}>
      <Image
        resizeMode="contain"
        source={appLogos.appLogo}
        style={styles.logoStyle}
      />
      <Text style={styles.logoTxtStyle}>Your easy fix in finding parking</Text>
    </ImageBackground>
  );
};

export default Splash;
