import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {family, size, WP, colors} from '../../shared/exporter';

export const AppCard = ({
  time,
  onPress,
  monthYear,
  numberText,
  messageText,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.bgCard}
      onPress={onPress}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{numberText}</Text>
        <Text style={styles.dateTxtStyle}>
          {monthYear} • {time}
        </Text>
      </View>
      <View style={styles.dividerView} />
      <Text numberOfLines={2} style={styles.msgText}>
        {messageText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bgCard: {
    width: '100%',
    borderRadius: 15,
    marginBottom: WP('3'),
    backgroundColor: colors.t3,
    paddingVertical: WP('2.5'),
    paddingHorizontal: WP('3.5'),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Light,
  },
  dateTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.SFProText_Light,
  },
  dividerView: {
    height: 1,
    width: '100%',
    marginVertical: WP('2.5'),
    backgroundColor: colors.g8,
  },
  msgText: {
    color: colors.w1,
    fontSize: size.xtiny,
    paddingBottom: WP('1'),
    fontFamily: family.SFProText_Medium,
  },
});
