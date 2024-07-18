import React from 'react';
import {Text, TouchableOpacity, StyleSheet,Image,View, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  WP,
  size,
  colors,
  family,
  platformOrientedCode,
  appImages,
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
  image,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={{opacity: disabled ? 0.5 : 1}}>
        {!image?
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
      :<View style={styles.btnOuter}>
        <Text style={styles.btnImageText}>Withdraw with</Text>
        <Image source={Platform.OS=="ios"?appImages.ApplePay: appImages.GooglePay}
      resizeMode="center"
      style={styles.Googlebtn}/>
        </View>}
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
  Googlebtn:{
    width:WP('33'),
    height:WP('10')
  },
  btnOuter:{
flexDirection:'row',
backgroundColor:"#ffff",
alignItems:'center',
justifyContent:'center',
borderRadius: 10,

height : WP('14'),
  },
  btnImageText:{
    color: "black",
    fontSize: size.large,
    fontFamily: family.SFProText_Light,
  },
  btnTxtStyle: {
    textAlign: 'right',
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.SFProText_SemiBold,
  },
});

export {AppButton};
