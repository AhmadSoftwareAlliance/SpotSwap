import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../shared/exporter';

export const TransactionsCard = ({title, type, price,des}) => {
  return (
    <View style={styles.mainCintainer}>
      <Image
        source={type === 'credited' ? appIcons.arrowUp : appIcons.arrowDown}
        style={styles.arrowImg}
        resizeMode="contain"
      />
      <View style={styles.rowContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.topUpText}>{title}</Text>
          {/* <Text style={styles.subText}>
            {type === 'credited' ? 'Bank Transfer' : 'SpotSwap'}
          </Text> */}
          <Text style={styles.subText}>
            {des === 'spot_swap' ?'SpotSwap':des==="bank_transfer"?"Bank Transfer":"WithDraw"}
          </Text>
        </View>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCintainer: {
    borderRadius: 10,
    padding: WP('4'),
    flexDirection: 'row',
    marginBottom: WP('2.5'),
    backgroundColor: colors.t1,
  },
  arrowImg: {
    width: WP('8.5'),
    height: WP('8.5'),
    alignSelf: 'center',
  },
  innerContainer: {
    paddingLeft: WP('3'),
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topUpText: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Medium,
    lineHeight: 19,
  },
  subText: {
    color: colors.g2,
    fontSize: size.tiny,
    paddingTop: WP('1'),
    fontFamily: family.SFProText_Light,
  },
  priceText: {
    color: colors.white,
    fontSize: size.large,
    alignSelf: 'center',
    fontFamily: family.SFProText_SemiBold,
  },
});
