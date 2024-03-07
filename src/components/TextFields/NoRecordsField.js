import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, family, size} from '../../shared/exporter';

export const NoRecordsField = ({loading, content}) => {
  return (
    <View style={styles.noRecordsView}>
      <Text style={styles.noRecords}>{loading ? '' : content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noRecordsView: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecords: {
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.SFProText_SemiBold,
  },
});
