import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {appImages, WP} from '../../../../../shared/exporter';
import {
  Spacer,
  AppButton,
  AppHeader,
  AppLoader,
} from '../../../../../components';
import styles from './styles';
import Pending from './Pending';
import Completed from './Completed';

// redux stuff
import {useDispatch} from 'react-redux';
import {getSupportTicketsRequest} from '../../../../../redux/actions';

const Support = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [tab, setTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTickts, setPendingTickts] = useState([]);
  const [completedTickts, setCompletedTickts] = useState([]);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getSupportTickets();
  }, [isFocus]);

  const getSupportTickets = () => {
    setIsLoading(true);
    dispatch(
      getSupportTicketsRequest(
        res => {
          setIsLoading(false);
          setPendingTickts(res?.pending_tickets);
          setCompletedTickts(res?.completed_tickets);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader title="Support" onBackPress={() => navigation.goBack()} />
      <Spacer androidVal={WP('6')} iOSVal={WP('6')} />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTab('Pending')}
          style={styles.feedTabStyle(tab === 'Pending')}>
          <Text style={styles.tabTxtStyle(tab === 'Pending')}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTab('Completed')}
          style={styles.friendsTabStyle(tab !== 'Pending')}>
          <Text style={styles.tabTxtStyle(tab !== 'Pending')}>Completed</Text>
        </TouchableOpacity>
      </View>
      <Spacer androidVal={WP('6')} iOSVal={WP('6')} />
      {tab === 'Pending' ? (
        <Pending pendingTickts={pendingTickts} isLoading={isLoading} />
      ) : (
        <Completed completedTickts={completedTickts} isLoading={isLoading} />
      )}
      <View style={styles.bottomView}>
        <AppButton
          title="Create Ticket"
          onPress={() => navigation.navigate('CreateTicket')}
        />
      </View>
    </ImageBackground>
  );
};

export default Support;
