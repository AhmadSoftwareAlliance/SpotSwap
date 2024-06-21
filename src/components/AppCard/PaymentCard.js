import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  appIcons,
  checkBrand,
} from '../../shared/exporter';
import { log } from 'react-native-reanimated';

export const PaymentCard = ({item, index, onPressItem}) => {
  console.log("item>>>pamebt card",JSON.stringify(item,null,2));
  let brandLogo =
    item?.payment_type === 'paypal'
      ? appIcons.PayPalIcon
      : item?.payment_type === 'wallet'
      ? appIcons.walletIcon
      : checkBrand(item?.brand);
  let title =
    item?.payment_type === 'paypal'
      ? `${item?.user_name}`
      : item?.payment_type === 'wallet'
      ? 'Wallet'
      : `**** **** **** ${item?.last_digit}`;
  let desc =
    item?.payment_type === 'paypal'
      ? `${item?.email}`
      : item?.payment_type === 'wallet'
      ? `Available balance: $${item?.amount}`
      : `Expires ${item?.exp_month}/${item?.exp_year?.toString()?.slice(-2)}`;
  return (
    <>
      <View key={index} style={styles.mainContainer}>
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={onPressItem}
          style={styles.rowContainer}>
          <Image
            resizeMode="contain"
            source={
              item?.is_default ? appIcons.whiteChecked : appIcons.unChecked
            }
            style={styles.iconStyle}
          />
          <Image
            resizeMode="contain"
            source={brandLogo}
            style={styles.imgStyle}
          />
        </TouchableOpacity>
        <View style={styles.innerView}>
          <Text style={styles.titleText}>{title}</Text>
          <Text numberOfLines={2} style={styles.subTitle}>
            {desc}
          </Text>
        </View>
      </View>
      {item?.is_default && (
        <Text style={styles.currentMethodStyle}>Current Payment Method</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    padding: WP('3.3'),
    marginTop: WP('5'),
    flexDirection: 'row',
    backgroundColor: colors.t1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
    alignSelf: 'center',
  },
  imgStyle: {
    width: WP('15'),
    height: WP('10'),
    alignSelf: 'center',
    marginLeft: WP('2.5'),
  },
  innerView: {
    width: '80%',
    paddingHorizontal: WP('3.3'),
  },
  titleText: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  subTitle: {
    color: colors.w1,
    fontSize: size.tiny,
    paddingVertical: WP('1'),
    fontFamily: family.SFProText_Regular,
  },
  currentMethodStyle: {
    color: colors.w1,
    fontSize: size.tiny,
    paddingTop: WP('1'),
    fontFamily: family.SFProText_Regular,
  },
});
