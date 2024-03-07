import React, {useState} from 'react';
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
import {logoutRequset, deleteAccountReq} from '../../../../redux/actions';

const Settings = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const {userInfo} = useSelector(state => state.auth);
  const { carInfo, userProfile } = useSelector(state => state.profile);
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
    console.log("item>>",item);
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
              (userProfile?.is_info_complete? navigation.navigate(item?.screen):Alert.alert("",'Firstly, update personal information', [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('PersonalInfo');
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
