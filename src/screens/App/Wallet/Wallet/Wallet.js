import React, {useState, useEffect,useRef,} from 'react';
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
  AppInput,
  AppModal,
} from '../../../../components';
import {appImages, colors, topUpField, topUpVS, WP} from '../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch, useSelector} from 'react-redux';
import {getWalletDetailsRequest,withDrawRequest} from '../../../../redux/actions';
import { GetToken } from '../../../../shared/utilities/headers';
import { AppModal2 } from '../../../../components/Modal/AppModal2';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'react-native-elements';
let count = 0;

const Wallet = ({navigation}) => {
  const formikRef = useRef();
  const isFocus = useIsFocused(null);
  const [data, setData] = useState([]);
  console.log("data tansection",JSON.stringify(data,null,2));
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showAppModal2, setShowAppModal2] = useState(false);
  const [showAppModal3, setShowAppModal3] = useState(false);
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
    // if(values.amount>50){
      setIsLoading(true);
      var params = new FormData();
      params.append('amount', values?.amount);
     
      const onSuccess = res => {
        console.log("res on topup",JSON.stringify(res,null,2));
        setIsLoading(false);
        setShowAppModal(false)
        // getWalletDetails(true);
        setTimeout(() => {
          setShowAppModal2(true);
        }, 300);
      };
      const onFailure = err => {
        console.log('Error ==> ', err);
        setIsLoading(false);
        setShowAppModal(false)
        if (
          err[0] ===
            'Your Stripe Connect Account data is missing or invalid, Please provide valid data.' ||
          err[0] ===
            'Your Account status is Pending. Please wait, it may take a few minutes.' ||
          err[0] === 'Please Complete your Account Details.'
        ) {
          Alert.alert('Withdraw Fail', err[0], [
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

    // }else{
    //   Alert.alert("Add minimum $50")
    // }
   
    dispatch(withDrawRequest(params, onSuccess, onFailure));
  };

  const renderItem = ({item}) => (
    console.log("item",JSON.stringify(item,null,2)),
    <TransactionsCard
      title={item.title}
      price={item.amount}
      type={item.transaction_type}
      des={item.top_up_description}
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
            onPress={() => setShowAppModal3(true)}
            // onPress={() => (userProfile?.profile_complete? navigation.navigate('TopUp'):Alert.alert("",'Go to settings and update Car Info first.', [
            //   {
            //     text: 'OK',
            //     onPress: () => {
            //       // navigation.navigate('Settings');
            //     },
            //   },
            // ]))}
          />
           <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
           <AppButton
            title="Withdraw"
            width={WP('33')}
            height={WP('10')}
            bgColor={colors.btn_gradient}
            titleTxtStyle={styles.btnText}
            // onPress={() => withDrawWallet()}
            // onPress={() => handleWithDraw()}
            onPress={() => setShowAppModal(true)}
          />
        
        </View>
      </ImageBackground>
     
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
      {showAppModal && (
        <Modal  isVisible={showAppModal}>
        {/* <View style={styles.modalContainer}> */}
        <ImageBackground
        source={appImages.wallet_bg}
        resizeMode="cover"
        style={styles.bgImg2}>
        <View style={styles.iconContainer}>
            <Icon
              type={'entypo'}
              name={'cross'}
              size={22}
              color={colors.g2}
              style={styles.iconStyle}
              onPress={() => setShowAppModal(false)}
            />
          </View>
        <Formik
        innerRef={formikRef}
        initialValues={topUpField}
        onSubmit={values => {
          // handleTopUp(values);
          handleWithDraw(values);
        }}
        validationSchema={topUpVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          // <KeyboardAwareScrollView
          //   contentContainerStyle={styles.scrollViewStyle}
          //   showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
              <AppInput
                placeholder="Enter Amount "
                title="Enter Amount (Minimum $50)"
                phTextColor={colors.white}
                touched={touched.amount}
                errorMessage={errors.amount}
                renderErrorMessage
                onBlur={() => setFieldTouched('amount')}
                value={values.amount}
                onChangeText={handleChange('amount')}
              />
               <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
              <AppButton
            title="Withdraw"
            width={WP('33')}
            height={WP('10')}
            // image={true}
            bgColor={colors.btn_gradient}
            titleTxtStyle={styles.btnText}
            // onPress={() => withDrawWallet()}
            // onPress={() => handleWithDraw()}
            // onPress={() =>values.amount>50?  handleSubmit():Alert.alert("Add minimum $50")}
            onPress={() =>values.amount>=50?  handleSubmit():Alert.alert("Minimum withdrawal amount is $50")}
          />
           <Spacer androidVal={WP('2')} iOSVal={WP('4')} />
            </View>
           
          // </KeyboardAwareScrollView>
        )}
      </Formik>
         </ImageBackground>
        {/* </View> */}
      </Modal>
      )}
      {showAppModal3 && (
        <Modal  isVisible={showAppModal3}>
        {/* <View style={styles.modalContainer}> */}
        <ImageBackground
        source={appImages.wallet_bg}
        resizeMode="cover"
        style={styles.bgImg3}>
        <View style={styles.iconContainer}>
            <Icon
              type={'entypo'}
              name={'cross'}
              size={22}
              color={colors.g2}
              style={styles.iconStyle}
              onPress={() => setShowAppModal3(false)}
            />
          </View>
        <Formik
        innerRef={formikRef}
        initialValues={topUpField}
        onSubmit={values => {
          // handleTopUp(values);
          // handleWithDraw(values);
        }}
        validationSchema={topUpVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          // <KeyboardAwareScrollView
          //   contentContainerStyle={styles.scrollViewStyle}
          //   showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
             
              
              <AppButton
            title="Top Up"
            width={WP('33')}
            height={WP('10')}
            image={true}
            bgColor={colors.btn_gradient}
            titleTxtStyle={styles.btnText}
            onPress={() => (setShowAppModal3(false),(userProfile?.profile_complete? navigation.navigate('TopUp'):Alert.alert("",'Go to settings and update Car Info first.', [
              {
                text: 'OK',
                onPress: () => {
                  // navigation.navigate('Settings');
                },
              },
            ])))}
            // onPress={() =>values.amount>=50?  handleSubmit():Alert.alert("Minimum withdrawal amount is $50")}
          />
           <Spacer androidVal={WP('2')} iOSVal={WP('4')} />
            </View>
           
          // </KeyboardAwareScrollView>
        )}
      </Formik>
         </ImageBackground>
        {/* </View> */}
      </Modal>
      )}
       {showAppModal2 && (
        <AppModal
          show={showAppModal2}
          title={'Amount is\nSuccessfully withdraw!'}
          onPressHide={() => {
            setShowAppModal2(false);
            getWalletDetails(true);
            // navigation.navigate('Wallet');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default Wallet;
