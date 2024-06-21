import React, {useState, useEffect} from 'react';
import {Text, View, ImageBackground, FlatList, Alert, Linking} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Spacer,
  AppButton,
  AppLoader,
  HomeHeader,
  NoRecordsField,
  TransactionsCard,
} from '../../../../components';
import {appImages, colors, WP} from '../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {getWalletDetailsRequest,withDrawRequest} from '../../../../redux/actions';
import { GetToken } from '../../../../shared/utilities/headers';


let count = 0;

const Wallet = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const { carInfo, userProfile } = useSelector(state => state.profile);
  // console.log("carInfo",JSON.stringify(carInfo,null,2));
  useEffect(() => {
    if (count === 0) {
      count = 1;
      getWalletDetails(true);
    } else {
      getWalletDetails(false);
    }
  }, [isFocus]);

  const getWalletDetails = loading => {
    // setIsLoading(loading);
    dispatch(
      getWalletDetailsRequest(
        async res => {
          const {wallet_detail, wallet_histories} = res;
          setIsLoading(false);
          setData(wallet_histories);
          setBalance(wallet_detail?.amount);
          await AsyncStorage.setItem('walletAmount', wallet_detail?.amount);
        },
        err => {
          setIsLoading(false);
          if (err === 'You have not any Wallet.') {
            setBalance('0');
          }
          console.log('Err ==> ', err);
        },
      ),
    );
  };
  // const withDrawWallet = async (amount) => {
  //   console.log("withDraw amount ");
  //   try {
  //     const response = await fetch(`https://spotswap.stg.appscorridor.com/api/v1/wallets/withdraw_amount_from_wallet`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${await GetToken()}`,
  //       },
  //       body: JSON.stringify({
  //         amount: 1,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(` withDraw HTTP error! status: ${response.status}`);
  //     }
  
  //     const data = await response;
  //     console.log("response", JSON.stringify(data, null, 2));
     
  
  //     return;
  //   } catch (error) {
  //     console.error('withDraw waalett', error.message);
  //     if (
  //       error[0] ===
  //         'Your Stripe Connect Account data is missing or invalid, Please provide valid data.' ||
  //         error[0] ===
  //         'Your Account status is Pending. Please wait, it may take a few minutes.' ||
  //         error[0] === 'Please Complete your Account Details.'
  //     ) {
  //       Alert.alert('Top Up Fail', error, [
  //         {
  //           text: 'Cancel',
  //         },
  //         {
  //           text: 'Set Up',
  //           onPress: () => {
  //             Linking.openURL(error[1]);
  //           },
  //         },
  //       ]);
  //     } else {
  //       alert(error);
  //     }
  //     throw error;
  //   }
  // };
  const handleWithDraw = async values => {
    // setIsLoading(true);
    var params = new FormData();
    params.append('amount', 1);
   
    const onSuccess = res => {
      console.log("res on topup",JSON.stringify(res,null,2));
      setIsLoading(false);
     
      // setTimeout(() => {
      //   setShowAppModal(true);
      // }, 500);
    };
    const onFailure = err => {
      console.log('Error ==> ', err);
      setIsLoading(false);
      if (
        err[0] ===
          'Your Stripe Connect Account data is missing or invalid, Please provide valid data.' ||
        err[0] ===
          'Your Account status is Pending. Please wait, it may take a few minutes.' ||
        err[0] === 'Please Complete your Account Details.'
      ) {
        Alert.alert('Top Up Fail', err[0], [
          {
            text: 'Cancel',
          },
          {
            text: 'Set Up',
            onPress: () => {
              Linking.openURL(err[1]);
            },
          },
        ]);
      } else {
        alert(err);
      }
    };
    dispatch(withDrawRequest(params, onSuccess, onFailure));
  };

  const renderItem = ({item}) => (
    <TransactionsCard
      title={item.title}
      price={item.amount}
      type={item.transaction_type}
    />
  );

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <HomeHeader title="Wallet" />
      <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
      <ImageBackground
        source={appImages.wallet_bg}
        resizeMode="cover"
        style={styles.bgImg}>
        <View style={styles.mainContainer}>
          <Text style={styles.textStyle}>Available Balance</Text>
          <Text style={styles.balanceTxtStyle}>${balance}</Text>
          <AppButton
            title="Top Up"
            width={WP('33')}
            height={WP('10')}
            bgColor={colors.btn_gradient}
            titleTxtStyle={styles.btnText}
            onPress={() => (userProfile?.profile_complete? navigation.navigate('TopUp'):Alert.alert("",'Go to settings and update Car Info first.', [
              {
                text: 'OK',
                onPress: () => {
                  // navigation.navigate('Settings');
                },
              },
            ]))}
          />
        
        </View>
      </ImageBackground>
      {/* <AppButton
            title="With Draw"
            width={WP('33')}
            height={WP('10')}
            bgColor={colors.btn_gradient}
            titleTxtStyle={styles.btnText}
            // onPress={() => withDrawWallet()}
            onPress={() => handleWithDraw()}
          /> */}
      <Text style={styles.titleTxtStyle}>Recent Transactions</Text>
      {data && data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index.toString()}
        />
      ) : (
        <NoRecordsField loading={isLoading} content="No Transacations Found" />
      )}
    </ImageBackground>
  );
};

export default Wallet;
