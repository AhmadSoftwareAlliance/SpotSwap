import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  WP,
  size,
  colors,
  family,
  appLogos,
  appIcons,
  platformOrientedCode,
} from '../../shared/exporter';

export const ChatHeader = ({
  name,
  source,
  userType,
  isOnline,
  onBackPress,
  ticketNumber,
  appLogo = false,
  rightText = false,
}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <Icon
            type={'ionicon'}
            name={'arrow-back'}
            size={24}
            color={colors.white}
            onPress={onBackPress}
          />
          <View style={styles.imagesContainer}>
            <Image
              source={
                appLogo
                  ? appLogos.textLogo
                  : source
                  ? {uri: source}
                  : appLogos.textLogo
              }
              style={styles.imgStyle(appLogo)}
            />
            {isOnline && (
              <Image
                source={appIcons.onlineIcon}
                style={styles.onlineIconStyle}
              />
            )}
          </View>
          <View>
            <Text style={styles.nameTxtStyle}>{name || 'Admin'}</Text>
            {userType && userType !== 'admin' && (
              <View style={styles.typeContainer(userType)}>
                <Text style={styles.typeTxtStyle}>{userType}</Text>
              </View>
            )}
          </View>
        </View>
        {rightText ? (
          <Text style={styles.rightTxtStyle}>{ticketNumber}</Text>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: WP('1'),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingTop: platformOrientedCode(WP('4'), WP('2')),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  imagesContainer: {
    justifyContent: 'flex-end',
  },
  imgStyle: isAppLogo => {
    return {
      width: WP('8'),
      marginHorizontal: WP('3'),
      backgroundColor: colors.b1,
      height: isAppLogo ? WP('5') : WP('8'),
      borderRadius: isAppLogo ? WP('0') : WP('8'),
    };
  },
  onlineIconStyle: {
    right: WP('2.7'),
    width: WP('2.5'),
    height: WP('2.5'),
    alignSelf: 'center',
    position: 'absolute',
  },
  nameTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_SemiBold,
  },
  typeContainer: type => {
    return {
      top: WP('1'),
      borderRadius: 100,
      paddingVertical: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.p5,
      width: type === 'Host' ? WP('16') : WP('20'),
    };
  },
  typeTxtStyle: {
    color: colors.b4,
    fontSize: size.tiny,
    top: platformOrientedCode(-1, 1),
    fontFamily: family.SFProText_SemiBold,
  },
  rightTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
});
