import React from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {appImages} from '../../../../../shared/exporter';
import {AppHeader} from '../../../../../components';
import styles from './styles';

const SentSuccess = ({navigation}) => {
  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppHeader title="Support" onBackPress={() => navigation.goBack()} />
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Sent Successfully</Text>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('Support')}>
          Go back
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SentSuccess;
