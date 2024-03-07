import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  AppHeader,
  AppLoader,
  DeleteModal,
  PaymentCard,
  NoRecordsField,
} from '../../../../../components';
import {colors, appIcons, appImages} from '../../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {
  deleteCardRequest,
  getAllCardsRequest,
  defaultPayMethodReq,
} from '../../../../../redux/actions';

const PaymentScreen = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [item, setItem] = useState('');
  const [data, setData] = useState('');
  const [rowId, setRowId] = useState('');
  const [cards, setCards] = useState('');
  const [payPalAcc, setPayPalAcc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getAllCards();
  }, [isFocus]);

  const getAllCards = () => {
    setIsLoading(true);
    dispatch(
      getAllCardsRequest(
        res => {
          setIsLoading(false);
          setData(res);
          setCards(res?.cards);
          setPayPalAcc(res?.paypal_accounts);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const defaultPayMethod = ({id, payment_type}) => {
    setIsLoading(true);
    const params = new FormData();
    if (payment_type === 'credit_card') {
      params.append('card_detail_id', id);
    }
    if (payment_type === 'paypal') {
      params.append('paypal_account_id', id);
    }
    params.append('payment_type', payment_type);
    dispatch(
      defaultPayMethodReq(
        params,
        res => {
          getAllCards();
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const renderItem = ({item, index}) => (
    <PaymentCard
      item={item}
      index={index}
      onPressItem={() => defaultPayMethod(item)}
    />
  );

  const handleDelete = selItem => {
    setShowAppModal(false);
    setTimeout(() => {
      setIsLoading(true);
      const params = new FormData();
      params.append('id', selItem?.id);
      dispatch(
        deleteCardRequest(
          params,
          res => {
            getAllCards();
          },
          err => {
            setIsLoading(false);
            console.log('Err ==> ', err);
          },
        ),
      );
    }, 500);
  };

  const handleEdit = data => {
    navigation.navigate('EditCardDetails', {item: data?.item});
  };

  const renderHiddenItem = (data, rowMap) => {
    return data?.item?.id === rowId ? (
      <View style={styles.backBtnsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => {
            setRowId('');
            rowMap[data?.item?.id].closeRow();
            handleEdit(data);
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.editIcon}
            style={styles.editIconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            setItem(data?.item);
            rowMap[data?.item?.id].closeRow();
            setRowId('');
            setTimeout(() => {
              setShowAppModal(true);
            }, 500);
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.delIcon}
            style={styles.delIconStyle}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader title="Payment" onBackPress={() => navigation.goBack()} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addBtnStyle}
        onPress={() => navigation.navigate('AddPaymentMethod')}>
        <Image source={appIcons.addIcon} style={styles.addIconStyle} />
      </TouchableOpacity>
      {data?.cards?.length > 0 ||
      data?.paypal_accounts?.length > 0 ||
      data?.wallet ? (
        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View>
            {cards && cards?.length > 0 ? (
              <SwipeListView
                useFlatList
                data={cards}
                useNativeDriver
                extraData={cards}
                renderItem={renderItem}
                leftOpenValue={0}
                rightOpenValue={-110}
                previewOpenValue={0.1}
                previewOpenDelay={100}
                restSpeedThreshold={5}
                closeOnScroll
                closeOnRowPress
                onRowOpen={(rowKey, rowMap) => {
                  setRowId(rowKey);
                  let key = rowKey;
                  if (key === rowKey) {
                    return;
                  }
                  setTimeout(() => {
                    rowMap[rowKey].closeRow();
                  }, 2000);
                }}
                onRowClose={(rowKey, rowMap) => {
                  setRowId('');
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?.id}
                renderHiddenItem={(data, rowMap) =>
                  renderHiddenItem(data, rowMap)
                }
              />
            ) : null}
          </View>
          {payPalAcc && payPalAcc?.length > 0 ? (
            <FlatList
              data={payPalAcc}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(index, item) => index + item.toString()}
            />
          ) : null}
          {data?.wallet ? (
            <PaymentCard
              item={data?.wallet}
              index={33}
              onPressItem={() => defaultPayMethod(data?.wallet)}
            />
          ) : null}
          {showAppModal && (
            <DeleteModal
              show={showAppModal}
              title="Remove Card"
              subTitle="Are you sure you want to remove this payment method?"
              btnTitle="Confirm"
              subBtnTitle="Cancel"
              bgColor={colors.r_gradient}
              onPressHide={() => {
                setRowId('');
                setShowAppModal(false);
              }}
              selItem={item}
              onPress={handleDelete}
            />
          )}
        </ScrollView>
      ) : (
        <NoRecordsField loading={isLoading} content="No Payment Method Found" />
      )}
    </ImageBackground>
  );
};

export default PaymentScreen;
