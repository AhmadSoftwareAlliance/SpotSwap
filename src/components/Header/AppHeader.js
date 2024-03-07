import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {WP, size, colors, family} from '../../shared/exporter';

export const AppHeader = ({
  title = '',
  onBackPress,
  onRightPress,
  rightIcon = false,
}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <Icon
          type={'ionicon'}
          name={'arrow-back'}
          size={24}
          color={colors.white}
          onPress={onBackPress}
        />
        <Text style={styles.txtStyle}>{title}</Text>
        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightPress}
            style={styles.iconContainer}>
            <Icon
              type={'ionicon'}
              name={'md-add-outline'}
              size={28}
              color={colors.p6}
            />
          </TouchableOpacity>
        ) : (
          <Text style={styles.dummyTxtColor}>spots</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WP('1.5'),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  txtStyle: {
    left: WP('2.3'),
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_SemiBold,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.p7,
    paddingVertical: WP('0.5'),
    paddingHorizontal: WP('5'),
  },
  dummyTxtColor: {
    color: 'transparent',
  },
});
