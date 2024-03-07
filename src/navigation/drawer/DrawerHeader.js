import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useDrawerStatus} from '@react-navigation/drawer';
import {
  WP,
  size,
  colors,
  family,
  appIcons,
  appImages,
  StatusBarHeight,
  platformOrientedCode,
} from '../../shared/exporter';
import {drawerList} from '../../shared/utilities/constant';

const DrawerHeader = ({navigation}) => {
  const drawerStatus = useDrawerStatus();
  const {userProfile} = useSelector(state => state?.profile);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.drawerStyle}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerView}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={
              userProfile?.image ? {uri: userProfile?.image} : appImages.profile
            }
            style={styles.imgStyle}
          />
          <View>
            <Text style={styles.nameTxtStyle}>{userProfile?.name}</Text>
            <Text style={styles.profileTxtStyle}>Profile</Text>
          </View>
        </TouchableOpacity>
        {drawerStatus === 'open' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation?.toggleDrawer()}>
            <Image source={appIcons.backIcon} style={styles.backIconStyle} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.dividerView} />
      {drawerList.map((item, i) => (
       
        <>
         {/* {console.log("item",JSON.stringify(item,null,2))} */}
          <TouchableOpacity
            key={item?.id}
            activeOpacity={0.7}
            style={styles.rowContainer}
            onPress={() => navigation.navigate(item.screen,{screen:item.screen})}>
            <Image
              source={item.icon}
              resizeMode={'contain'}
              style={styles.iconStyle}
            />
            <Text style={styles.labelTextStyle}>{item.label}</Text>
          </TouchableOpacity>
          <View style={styles.dividerView} />
        </>
      ))}
    </SafeAreaView>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.g6,
    paddingTop: StatusBarHeight,
  },
  drawerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerView: {
    width: WP('65'),
    marginTop: WP('2'),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('2'),
    paddingHorizontal: WP('7'),
  },
  imgStyle: {
    width: WP('10'),
    height: WP('10'),
    borderRadius: 30,
    backgroundColor: colors.t2,
  },
  nameTxtStyle: {
    marginLeft: 9,
    minWidth: '84%',
    maxWidth: '84%',
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.SFProText_SemiBold,
  },
  profileTxtStyle: {
    marginTop: 4,
    marginLeft: 9,
    color: colors.white,
    fontSize: size.xxxtiny,
    fontFamily: family.SFProText_Medium,
  },
  backIconStyle: {
    width: WP('8'),
    height: WP('8'),
    left: WP('2.5'),
  },
  rowContainer: {
    bottom: WP('4'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: platformOrientedCode(WP('7.7'), WP('8.2')),
    paddingHorizontal: platformOrientedCode(WP('7.2'), WP('7.7')),
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  labelTextStyle: {
    left: 10,
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Medium,
  },
  dividerView: {
    height: 1,
    width: '100%',
    backgroundColor: colors.g7,
  },
});
