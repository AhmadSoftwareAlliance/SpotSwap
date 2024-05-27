import React, {useState,useEffect} from 'react';
import {
  Text,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Spacer, AppHeader, AppLoader} from '../../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appImages, WP} from '../../../../shared/exporter';
import {
  guideLines,
  commonSettings,
} from '../../../../shared/utilities/constant';
import styles from './styles';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {logoutRequset, deleteAccountReq, updateProfileRequest} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
const Settings = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFocus = useIsFocused(null);
  useEffect(() => {
    if (isFocus) {
      !userProfile?.is_info_complete&&userProfile?.profile_type!="social login"?
      handleUpdateInfo():null
     
    }
  }, [isFocus]);
  // redux stuff
  const dispatch = useDispatch(null);
  const {userInfo} = useSelector(state => state.auth);
  const { carInfo, userProfile } = useSelector(state => state.profile);
  console.log("userProfile>>>>setting screen",JSON.stringify(userProfile,null,2));
  const handleLogout = () => {
    // setIsLoading(true);
    dispatch(
      logoutRequset(
        async res => {
          setIsLoading(false);
          await AsyncStorage.setItem('login', 'false');
         await navigation.replace('Auth');
        },
        err => {
          console.log('Err ==> ', err);
          setIsLoading(false);
          Alert.alert('Logout Fail', err, [
            {
              text: 'OK',
            },
          ]);
        },
      ),
    );
  };

  const handleDelAccount = () => {
    Alert.alert('Delete Account!', 'Are you sure to delete your account?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'Delete', onPress: () => deleteAccount()},
    ]);
  };
  const handleUpdateInfo =async() => {
    console.log("handleUpdateInfo called");
    setIsLoading(true);
    const params = new FormData();
    params.append('name', userProfile?.name);
    params.append('email', userProfile?.email);
    params.append('contact', userProfile?.contact);
    params.append('country_code', userProfile?.country_code);
    // if (personImage) {
    //   params.append('image', {
    //     name: personImage?.filename || 'image',
    //     uri: personImage?.path,
    //     type: personImage?.mime,
    //   });
    // }
    dispatch(
      updateProfileRequest(
        params,
        res => {
          console.log("updateProfileRequest home>>",JSON.stringify(res,null,2));
          setIsLoading(false);
        },
        err => {
          console.log("updateProfileRequest home error>>",JSON.stringify(err,null,2));
          setIsLoading(false);
         
        },
      ),
    );
  };
  const deleteAccount = () => {
    console.log(">>>>1",userInfo?.id);
    setIsLoading(true);
    let data = new FormData();
    data.append('user_id', userInfo?.id);
    const cbSuccess = async res => {
      console.log(">>>response",res);
      await AsyncStorage.setItem('login', 'false');
      setIsLoading(false);
      Alert.alert('User Deleted!', res?.message, [
        {text: 'Ok', onPress: () => navigation.replace('Auth')},
      ]);
    };
    const cbFailure = err => {
      setIsLoading(false);
      alert('Something went wrong, try later!');
      console.log('Delete Acc Err ==> ', err);
    };
    dispatch(deleteAccountReq(data, cbSuccess, cbFailure));
  };

  const Row = ({item}) => {
    // console.log("item>>",item);
    return (
      <TouchableOpacity
        key={item?.id}
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => {
          if (item?.screen === 'DeleteAccount') {
            handleDelAccount();
          } else if (item?.screen === 'LogOut') {
            handleLogout();
          }else if(item?.screen=="UpdateCarInfo"){
              // (!userProfile?.is_info_complete&&userProfile?.profile_type=="social login"? navigation.navigate(item?.screen):Alert.alert("",'Update personal info first.', [
              (userProfile?.is_info_complete? navigation.navigate(item?.screen):Alert.alert("",'Update personal info first.', [
                {
                  text: 'OK',
                  onPress: () => {
                    // navigation.navigate('PersonalInfo');
                  },
                },
              ]))
          }else {
             navigation.navigate(item?.screen)
          }
        }}>
        <Image
          resizeMode="contain"
          source={item?.icon}
          style={item.iconStyle}
        />
        <Text style={styles.itemTxtStyle}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader title="Settings" onBackPress={() => navigation.goBack()} />
      <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {commonSettings.map(item => (
          <Row item={item} />
        ))}
        <Text style={styles.hTxtStyle}>Guidelines</Text>
        {guideLines.map(item => (
          <Row item={item} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default Settings;
