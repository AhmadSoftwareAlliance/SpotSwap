import React, {useState, useEffect} from 'react';
import {ImageBackground, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {
  Spacer,
  AppLoader,
  HomeHeader,
  HistoryCard,
  NoRecordsField,
} from '../../../../components';
import {appImages, WP} from '../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {getHistoryRequest} from '../../../../redux/actions';

let count = 0;

const History = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

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
          setIsLoading(false);
          setData(res?.payment_histories);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const renderCard = ({item, index}) => {
    return (
      <HistoryCard
        placeName={item.connection_location}
        userType={item.user_type}
        time={item.slot_transfer_date_time}
        onPress={() => navigation.navigate('HistoryDetail', {item: item})}
      />
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <HomeHeader title="History" />
      <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
      {data && data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
          keyExtractor={(index, item) => index + item.toString()}
        />
      ) : (
        <NoRecordsField
          loading={isLoading}
          content={isLoading ? '' : 'No history found'}
        />
      )}
    </ImageBackground>
  );
};

export default History;
