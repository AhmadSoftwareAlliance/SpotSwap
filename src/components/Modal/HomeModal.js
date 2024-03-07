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

export const HomeModal = ({
  show,
  desc,
  title,
  onHide,
  onPress,
  onPressHide,
  isHome = false,
  isButton = true,
  buttonText = '',
  hideButtonText = '',
  isTextButton = true,
  isCrossButton = false,
}) => {
  return (
    <Modal onBackdropPress={isHome ? onHide : onPressHide} isVisible={show}>
      <View style={styles.modalContainer}>
        {isCrossButton && (
          <View style={styles.iconContainer}>
            <Icon
              type={'entypo'}
              name={'cross'}
              size={26}
              color={colors.g2}
              style={styles.iconStyle}
              onPress={() => onPressHide()}
            />
          </View>
        )}
        <Text style={styles.titleTxtStyle(isCrossButton)}>{title}</Text>
        <Text style={styles.descTxtStyle(desc)}>{desc}</Text>
        {isButton && (
          <AppButton
            title={buttonText}
            width={WP('40')}
            height={WP('12')}
            onPress={onPress}
          />
        )}
        {isTextButton && (
          <Text style={styles.cancelTxtStyle} onPress={() => onPressHide()}>
            {hideButtonText}
          </Text>
        )}
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
    paddingBottom: WP('9'),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: '100%',
    paddingBottom: 0,
    alignItems: 'flex-end',
    padding: platformOrientedCode(WP('3'), 0),
  },
  iconStyle: {
    padding: WP('3'),
    paddingBottom: 0,
  },
  titleTxtStyle: isCrossButton => {
    return {
      color: colors.b1,
      textAlign: 'center',
      fontSize: size.xxlarge,
      paddingHorizontal: WP('6.5'),
      fontFamily: family.SFProText_SemiBold,
      paddingTop: isCrossButton ? WP('2') : WP('7.5'),
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
    fontFamily: family.SFProText_Regular,
  },
});
