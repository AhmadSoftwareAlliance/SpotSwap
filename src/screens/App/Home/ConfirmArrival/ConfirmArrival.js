import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {appImages} from '../../../../shared/exporter';
import {AppButton, HomeModal} from '../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {
  stillInterestedReq,
  cancelConnectionRequest,
} from '../../../../redux/actions';

const ConfirmArrival = ({navigation, route}) => {
  const [timerClock, setTimerClock] = useState(30);
  const [showAppModal, setShowAppModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    if (timerClock > 0) {
      const timer = setTimeout(function () {
        setTimerClock(timerClock - 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      cancelConnection();
    }
  }, [timerClock]);

  const cancelConnection = () => {
    const {swapper} = route?.params?.item;
    const params = new FormData();
    params.append('swapper_id', swapper?.id);
    dispatch(
      cancelConnectionRequest(
        params,
        res => {
          setShowAppModal(true);
        },
        err => {
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const stillInterested = () => {
    const {connection_id} = route?.params?.item;
    const params = new FormData();
    params.append('connection_id', connection_id);
    dispatch(
      stillInterestedReq(
        params,
        res => {
          setShowAppModal(true);
          navigation.navigate('ConnectToHost', {
            item: res?.swapper_host_connection,
            connected: 'true',
          });
        },
        err => {
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <Text style={styles.titleText}>Confirm Arrival</Text>
      <Text style={styles.subText}>
        Host is issuing a Confirm{'\n'}Arrival, are you still interested in
        {'\n'}the spot?
      </Text>
      <Text style={styles.timerTxtStyle}>{timerClock}</Text>
      <View style={styles.bottomView}>
        <AppButton title="Yes" onPress={() => stillInterested()} />
        <Text style={styles.cancelText} onPress={() => cancelConnection()}>
          Cancel
        </Text>
      </View>
      {showAppModal && (
        <HomeModal
          buttonText="Okay"
          show={showAppModal}
          isTextButton={false}
          title={'That’s Okay'}
          onPress={() => {
            setShowAppModal(false);
            navigation.navigate('Home');
          }}
          desc={
            'You failed to acknowledge the confirm arrival, Spot Swap cancelled this connection'
          }
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('Home');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default ConfirmArrival;
