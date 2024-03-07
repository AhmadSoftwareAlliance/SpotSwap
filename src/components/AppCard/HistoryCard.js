import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {family, size, WP, colors} from '../../shared/exporter';

const HistoryCard = ({placeName, time, userType, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.bgCard}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.historyRow}>
        <Text style={styles.parkingTxtStyle}>{placeName}</Text>
        <Text style={styles.priceTxtStyle}>
          ${userType === 'Host' ? '10.00' : '11.00'}
        </Text>
      </View>
      <Text style={styles.dateTxtStyle}>
        {moment(time).format('ll')} <Text> • </Text> {moment(time).format('LT')}
      </Text>
    </TouchableOpacity>
  );
};

export {HistoryCard};

const styles = StyleSheet.create({
  bgCard: {
    width: '100%',
    borderRadius: 10,
    marginBottom: WP('3'),
    paddingVertical: WP('3.5'),
    paddingHorizontal: WP('5'),
    backgroundColor: colors.t3,
  },
  historyContainer: {
    paddingHorizontal: WP('5'),
  },
  historyRow: {
    marginTop: WP('1'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parkingTxtStyle: {
    width: '82%',
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  priceTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  dateTxtStyle: {
    color: colors.w1,
    marginTop: WP('1.5'),
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
});
