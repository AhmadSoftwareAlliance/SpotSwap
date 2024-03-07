import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {appLogos, colors, family, size, WP} from '../../shared/exporter';

export const ChatCard = ({
  title,
  onPress,
  subTitle,
  userImage,
  isBlock = false,
  onBlockPress = {},
}) => {
  return (
    <TouchableOpacity
      style={styles.mainConatiner}
      activeOpacity={isBlock ? 1 : 0.7}
      onPress={isBlock ? onBlockPress : onPress}>
      <Image
        style={styles.imgStyles}
        source={userImage ? {uri: userImage} : appLogos.appLogo}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subText}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    borderRadius: 10,
    padding: WP('3'),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('3'),
    paddingVertical: WP('4'),
    backgroundColor: colors.t1,
  },
  imgStyles: {
    width: WP('12'),
    height: WP('12'),
    borderWidth: 1.5,
    alignSelf: 'center',
    borderRadius: WP('12'),
    borderColor: colors.white,
  },
  innerContainer: {
    paddingLeft: WP('3'),
  },
  titleText: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Medium,
  },
  subText: {
    color: colors.w1,
    paddingTop: WP('2'),
    fontSize: size.tiny,
    fontFamily: family.SFProText_Light,
  },
});
