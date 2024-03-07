import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {appImages} from '../../../../../shared/exporter';
import {AppButton} from '../../../../../components';
import styles from './styles';

const PaypalAddedSuccessfully = ({navigation}) => {
  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <Text style={styles.titleText}>Paypal Added Successfully</Text>
      <Text style={styles.subText}>
        Your paypal account has been added {'\n'} successfully.
      </Text>
      <View style={styles.bottomView}>
        <AppButton
          title="Go Back"
          onPress={() => navigation.navigate('Payment')}
        />
      </View>
    </ImageBackground>
  );
};

export default PaypalAddedSuccessfully;
