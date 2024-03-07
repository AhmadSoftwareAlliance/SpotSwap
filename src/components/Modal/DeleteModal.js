import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {WP, size, colors, family} from '../../shared/exporter';
import {AppButton} from '../AppButton/AppButton';

export const DeleteModal = ({
  show,
  title,
  bgColor,
  onPress,
  subTitle,
  btnTitle,
  onPressHide,
  subBtnTitle,
  selItem = null,
}) => {
  return (
    <Modal isVisible={show}>
      <View style={styles.modalContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subText}>{subTitle} </Text>
        <AppButton
          width={WP('42')}
          height={WP('12')}
          title={btnTitle}
          bgColor={bgColor}
          onPress={() => onPress(selItem)}
          borderColor={colors.white}
        />
        <Text style={styles.textCancel} onPress={onPressHide}>
          {subBtnTitle}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: WP('1.5'),
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: WP('5'),
  },
  titleText: {
    color: colors.b1,
    textAlign: 'center',
    marginTop: WP('8.5'),
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_SemiBold,
  },
  subText: {
    color: colors.b1,
    textAlign: 'center',
    fontSize: size.normal,
    marginVertical: WP('4.5'),
    fontFamily: family.SFProText_Regular,
  },
  textCancel: {
    color: colors.b3,
    textAlign: 'center',
    paddingTop: WP('4'),
    fontSize: size.normal,
    paddingBottom: WP('5.5'),
    fontFamily: family.SFProText_Regular,
  },
});
