import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {WP, appImages} from '../../../shared/exporter';
import {Spacer, AppButton, AppHeader} from '../../../components';
import styles from './styles';

const VerificationSent = ({navigation, route}) => {
  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppHeader onBackPress={() => navigation.goBack()} />
     <View style={styles.rootInerContainer}>
     <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
      <Text style={styles.passTxtStyle}>Verification Sent</Text>
      <Text style={styles.descTxtStyle}>
        Please check your messages if you’ve received an OTP
      </Text>
      <Spacer androidVal={WP('22')} iOSVal={WP('22')} />
     </View>
      <View style={styles.bottomView}>
        <AppButton
          title="Enter OTP"
          onPress={() =>
            navigation.navigate('VerifyOTP', {mail: route?.params?.mail})
          }
        />
      </View>
    </ImageBackground>
  );
};

export default VerificationSent;
