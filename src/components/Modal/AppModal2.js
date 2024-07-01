import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {
  colors,
  WP,
  family,
  size,
  platformOrientedCode,
} from '../../shared/exporter';
import {AppButton} from '../AppButton/AppButton';

export const AppModal2 = ({
  show,
  desc,
  title,
  onPress,
  onPressHide,
  isButton = false,
}) => {
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={styles.modalContainer}>
        {/* {!isButton && (
          <View style={styles.iconContainer}>
            <Icon
              type={'entypo'}
              name={'cross'}
              size={22}
              color={colors.g2}
              style={styles.iconStyle}
              onPress={() => onPressHide()}
            />
          </View>
        )} */}
         <AppInput
                placeholder="Enter Amount"
                title="Enter Amount"
                phTextColor={colors.white}
                touched={touched.amount}
                errorMessage={errors.amount}
                renderErrorMessage
                // onBlur={() => setFieldTouched('amount')}
                value={values.amount}
                // onChangeText={handleChange('amount')}
              />
        {/* <Text style={styles.titleTxtStyle(isButton)}>{title}</Text> */}
      
        {/* {isButton && (
          <>
            <AppButton
              title="Yes"
              width={WP('40')}
              height={WP('12')}
              onPress={() => onPressHide()}
            />
            <Text style={styles.cancelTxtStyle}>Cancel</Text>
          </>
        )} */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '95%',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: WP('1.5'),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: platformOrientedCode(WP('3'), 0),
  },
  iconStyle: {
    padding: WP('3'),
  },
  titleTxtStyle: isButton => {
    return {
      color: colors.b1,
      textAlign: 'center',
      fontSize: size.xxlarge,
      paddingHorizontal: WP('6.5'),
      fontFamily: family.SFProText_SemiBold,
      paddingTop: isButton ? WP('7.5') : WP('1'),
    };
  },
  descTxtStyle: isDesc => {
    return {
      color: colors.b1,
      textAlign: 'center',
      paddingTop: WP('3.5'),
      fontSize: size.normal,
      paddingHorizontal: WP('6.5'),
      paddingBottom: isDesc ? WP('5') : 0,
      fontFamily: family.SFProText_Regular,
    };
  },
  cancelTxtStyle: {
    color: colors.b3,
    paddingTop: WP('4'),
    fontSize: size.normal,
    paddingBottom: WP('5'),
    fontFamily: family.SFProText_Regular,
  },
});
