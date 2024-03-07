import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/core';
import {HomeHeader, NoRecordsField} from '../../../../components';
import {appIcons, appImages} from '../../../../shared/exporter';
import styles from './styles';

let count = 0;

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {getHistoryRequest} from '../../../../redux/actions';

const Profile = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const {userProfile, carInfo} = useSelector(state => state.profile);
  // console.log("userProfile>>>>>11",JSON.stringify(carInfo,null,2));

  useEffect(() => {
    if (isFocus) {
      if (count === 0) {
        count = 1;
        getHistory(true);
      } else {
        getHistory(false);
      }
    }
  }, [isFocus]);

  const getHistory = loading => {
    setIsLoading(loading);
    dispatch(
      getHistoryRequest(
        res => {
          let history = res?.payment_histories;
          setIsLoading(false);
          if (history?.length > 5) {
            setData(history?.slice(0, 5));
          } else {
            setData(history);
          }
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const Row = ({title, val}) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={styles.hTxtStyle}>{title}</Text>
        <Text style={styles.valTxtStyle}>{val}</Text>
      </View>
    );
  };

  const renderImages = ({item, index}) => {
    console.log("item",item);
    return (
      <>
        <Image
          source={item?.url ? {uri: item?.url} : appImages.car}
          style={styles.itemImgStyle}
        />
        {index % 2 === 0 ? <View style={styles.spaceView} /> : null}
      </>
    );
  };

  const renderHistory = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.historyContainer}
          onPress={() => navigation.navigate('HistoryDetail', {item: item})}>
          <View style={styles.historyRow}>
            <Text style={styles.parkingTxtStyle}>
              {item.connection_location}
            </Text>
            <Text style={styles.parkingTxtStyle}>
              ${item?.user_type === 'Host' ? '10.00' : '11.00'}
            </Text>
          </View>
          <Text style={styles.dateTxtStyle}>
            {moment(item.slot_transfer_date_time).format('ll')} <Text> • </Text>{' '}
            {moment(item.slot_transfer_date_time).format('LT')}
          </Text>
        </TouchableOpacity>
        <View style={styles.dividerView} />
      </>
    );
  };

  const keyExtractor = item => item?.id;

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <HomeHeader
        title="Profile"
        onPress={() => {}}
        rightIcon={
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Settings')}>
            <Image
              resizeMode="contain"
              source={appIcons.settingsIcon}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <View style={styles.imageContainer}>
            <Image
              source={
                userProfile?.image ? {uri: userProfile?.image} : appImages.profile
              }
              style={styles.imgStyle}
            />
          </View>
          <View>
            <Text style={styles.nameTxtStyle}>{userProfile?.name}</Text>
            {/* <Text style={styles.carTxtStyle}>{carInfo?.car_model}</Text> */}
            <Text style={styles.carTxtStyle}>{carInfo?.user_car_models?.[0]?.title ? carInfo?.user_car_models?.[0]?.title : carInfo?.car_model}</Text>
          </View>
        </View>
        <View style={styles.codeBoxView}>
          <Text style={styles.hTxtStyle}>
            Referral Code: {userProfile?.referral_code}
          </Text>
        </View>
        <View style={styles.boxView}>
          <Text style={styles.titleTxtStyle}>Car Details</Text>
          <Row title="Made/Brand" val={carInfo?.user_car_brands?.[0]?.title ? carInfo?.user_car_brands?.[0]?.title : carInfo?.car_brand} />
          {/* <Row title="Made/Brand" val={carInfo?.car_brand} /> */}
          {/* <Row title="Car Model" val={carInfo?.car_model} /> */}
          <Row title="Car Model" val={carInfo?.user_car_models?.[0]?.title ? carInfo?.user_car_models?.[0]?.title : carInfo?.car_model} />
          {/* <Row title="Color" val={carInfo?.car_color} /> */}
          <Row title="Color" val={carInfo?.color?carInfo?.color:carInfo?.car_color} />
          <Row title="Plate Number" val={carInfo?.plate_number || 'N/A'} />
        </View>
        {carInfo?.is_show ? (
          <View style={styles.boxView}>
            <Text style={[styles.titleTxtStyle, styles.marginBottom]}>
              My Car Image
            </Text>
            {carInfo?.photos?.length > 0 ? (
              <FlatList
                data={carInfo?.photos}
                numColumns={2}
                renderItem={renderImages}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <NoRecordsField loading={isLoading} content="No photo found" />
            )}
          </View>
        ) : (
          <View />
        )}
        <View style={[styles.boxView, styles.paddingHorizontal]}>
          <Text style={[styles.titleTxtStyle, styles.txtPaddingHorizontal]}>
            Recent History
          </Text>
          {data?.length > 0 ? (
            <FlatList
              data={data}
              renderItem={renderHistory}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flStyle}
            />
          ) : (
            <NoRecordsField loading={isLoading} content="No history found" />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
