import React, {useState, useEffect} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import moment from 'moment';
import {appImages, WP} from '../../../../shared/exporter';
import {AppHeader, Spacer} from '../../../../components';
import styles from './styles';

const HistoryDetail = ({navigation, route}) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem(route?.params?.item);
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
      <AppHeader title="History" onBackPress={() => navigation.goBack()} />
      <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
      <View style={styles.boxContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={
              item?.user_type === 'Swapper'
                ? item?.host_image
                  ? {uri: item?.host_image}
                  : appImages.car
                : item?.swapper_image
                ? {uri: item?.swapper_image}
                : appImages.car
            }
            style={styles.imgStyle}
          />
          <View style={styles.innerView}>
            <Text style={styles.titleTxtStyle}>
              {item?.user_type === 'Swapper'
                ? item?.host?.name
                : item?.swapper?.name}
            </Text>
            <Text style={styles.bottomText}>
              {item?.user_type === 'Swapper'
                ? item?.host_car_model
                : item?.swapper_car_model}
            </Text>
          </View>
          <View style={styles.btn}>
            <Text style={styles.btnText}>
              {item?.user_type === 'Swapper' ? 'host' : 'swapper'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.boxView}>
        <Row
          title="Date"
          val={moment(item?.slot_transfer_date_time).format('ll')}
        />
        <Row
          title="Time"
          val={moment(item?.slot_transfer_date_time).format('ll')}
        />
        <Row title="Location" val={item?.connection_location} />
      </View>
      <View style={styles.boxView}>
        <Row title="Swapper Fee" val="$10.00" />
        <Row title="SpotSwap Fee" val="$1.00" />
        <Row title="Total" val="$11.00" />
      </View>
    </ImageBackground>
  );
};

export default HistoryDetail;
