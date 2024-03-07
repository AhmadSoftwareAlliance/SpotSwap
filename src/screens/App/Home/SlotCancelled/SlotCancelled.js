import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {appImages} from '../../../../shared/exporter';
import {
  AppHeader,
  AppButton,
  HomeModal,
  AppLoader,
} from '../../../../components';
import styles from './styles';
import {useIsFocused} from '@react-navigation/core';
// redux stuff
import {useDispatch} from 'react-redux';
import {confirmCancelConnectionReq} from '../../../../redux/actions';

const SlotCancelled = ({navigation, route}) => {
  const [item, setItem] = useState('');
  console.log(item?.connection_id,"item on SlotCanceeld screen",item.parking_slot_id);
  const [dateTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const isFocus = useIsFocused(null);
  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    setItem(route?.params?.item);
  }, [isFocus]);

  const handleConfirm = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('connection_id', item?.connection_id);
    dispatch(
      confirmCancelConnectionReq(
        params,
        res => {
          console.log("res on Slotcancceled",JSON.stringify(res,null,2));
          setIsLoading(false);
          setTimeout(()=>{
            setShowAppModal(true);
          },500)
         
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
      <AppHeader onBackPress={() => navigation.goBack()} />
      <View style={styles.mainContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={
                item?.user_image
                  ? {
                      uri: item?.user_image,
                    }
                  : appImages.car
              }
              style={styles.imgStyle}
            />
            <View style={styles.innerView}>
              <Text style={styles.titleTxtStyle}>{item?.swapper?.name}</Text>
              <Text style={styles.bottomText}>{item?.car_model_name}</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>swapper</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.descText}>
          Is cancelling the request this{'\n'}
          {moment(dateTime).format('ll')} of {moment(dateTime).format('LT')}
        </Text>
        <AppButton title="Confirm" onPress={() => handleConfirm()} />
      </View>
      {showAppModal && (
        <HomeModal
          title={'Awww'}
          show={showAppModal}
          buttonText="Go Back"
          isTextButton={false}
          onPress={() => {
          ( setShowAppModal(false), navigation.navigate('Home', {
              slot: {id: item?.parking_slot_id},
              activated: true,
            }))
          }}
          desc={'Request has been cancelled.'}
          onPressHide={() => setShowAppModal(false)}
        />
      )}
    </ImageBackground>
  );
};

export default SlotCancelled;
