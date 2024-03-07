import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import {AppLoader} from '../../components';
import {appVideos} from '../../shared/exporter';
import styles from './styles';

const Walkthrough = ({navigation}) => {
  const video = useRef(null);
  const isFocus = useIsFocused();
  const [pause, setPause] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFocus) {
      setPause(true);
    }
  }, [!isFocus]);

  return (
    <View style={styles.rootContainer}>
      <AppLoader loading={isLoading} />
      <Video
        ref={video}
        repeat={true}
        paused={pause}
        resizeMode="cover"
        playInBackground={false}
        style={styles.videoStyle}
        source={appVideos.appIntro}
        ignoreSilentSwitch={'obey'}
        onLoad={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
      />
      <TouchableOpacity
        // activeOpacity={0.7}
        onPress={() => {
          AsyncStorage.setItem('walkthrough', 'true').then(res => {
            navigation.replace('Auth');
          });
        }}
        style={styles.buttonCircle}>
        <Text style={styles.skipTxtStyle}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Walkthrough;
