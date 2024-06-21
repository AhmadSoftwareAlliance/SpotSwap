import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {appIcons, appImages, appLogos, WP} from '../../../../shared/exporter';
import {Spacer} from '../../../../components';
import styles from './styles';

const ReceivedPayment = ({navigation, route}) => {
  const [data, setData] = useState('');
  console.log("ReceivedPayment data",JSON.stringify(data,null,2));

  useEffect(() => {
    setData(route?.params?.item);
  }, []);

  const Row = ({title, val}) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={styles.hTxtStyle}>{title}</Text>
        <Text style={styles.valTxtStyle(title)}>{val}</Text>
      </View>
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}>
        <Image source={appIcons.crossIcon} style={styles.iconStyle} />
      </TouchableOpacity>
      <Image source={appLogos.textLogo} style={styles.logoStyle} />
      <Text style={styles.paymentTxtStyle}>Received Payment</Text>
      <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
      <View style={styles.boxContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={data?.user_image ? {uri: data?.user_image} : appImages.car}
            style={styles.imgStyle}
          />
          <View style={styles.innerView}>
            <Text style={styles.titleTxtStyle}>{data?.swapper?.name}</Text>
            <Text style={styles.bottomText}>{data?.car_model_name}</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>swapper</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxView}>
        <Row
          title="Date"
          val={moment(data?.connection_date_time).format('ll')}
        />
        <Row
          title="Time"
          val={moment(data?.connection_date_time).format('LT')}
        />
        <Row title="Location" val={data?.connection_location} />
      </View>
      <View style={styles.boxView}>
        {/* <Row title="Swapper Fee" val="$10.00" />
        <Row title="SpotSwap Fee" val="$1.00" /> */}
        <Row title="Total" val={`$${data?.swapper_fee}`} />
      </View>
    </ImageBackground>
  );
};

export default ReceivedPayment;
