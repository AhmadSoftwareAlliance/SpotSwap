import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  WP,
  size,
  colors,
  family,
  platformOrientedCode,
} from '../../shared/exporter';

const AppButton = ({
  title,
  onPress,
  bgColor,
  iconType,
  titleTxtStyle,
  isIcon = false,
  disabled = false,
  width = WP('60'),
  height = WP('14'),
  borderColor = colors.s3,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={{opacity: disabled ? 0.5 : 1}}>
      <LinearGradient
        colors={bgColor ? bgColor : colors.b_gradient}
        style={styles.buttonContainer(width, height, borderColor)}>
        {isIcon ? (
          <Icon
            size={24}
            name={iconType === 'call' ? 'phone-call' : 'message1'}
            type={iconType === 'call' ? 'feather' : 'antdesign'}
            color={colors.white}
          />
        ) : (
          <Text style={[styles.btnTxtStyle, titleTxtStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: (width, height, borderColor) => {
    return {
      width: width,
      borderWidth: 1,
      borderRadius: 50,
      alignSelf: 'center',
      alignItems: 'center',
      borderColor: borderColor,
      justifyContent: 'center',
      height: platformOrientedCode(height, height),
    };
  },
  buttonStyle: width => {
    return {
      width: width,
      borderRadius: 50,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: platformOrientedCode(55, 55),
    };
  },
  btnTxtStyle: {
    textAlign: 'right',
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.SFProText_SemiBold,
  },
});

export {AppButton};
