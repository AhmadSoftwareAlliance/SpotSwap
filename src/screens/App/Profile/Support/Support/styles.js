import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  mainConatiner: {
    backgroundColor: colors.t1,
    padding: 15,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  bgCard: {
    width: '100%',
    borderRadius: 15,
    padding: WP('2'),
    marginTop: WP('2'),
    backgroundColor: colors.t3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
    fontFamily: family.SFProText_Light,
    fontSize: size.xsmall,
  },
  dateTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.SFProText_Light,
  },
  dividerView: {
    height: 1,
    width: '100%',
    marginTop: WP('3'),
    marginBottom: WP('1.2'),
    backgroundColor: colors.g8,
  },
  msgText: {
    color: colors.w1,
    fontSize: size.xtiny,
    fontFamily: family.SFProText_Medium,
  },
  bottomView: {
    bottom: WP('12'),
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  tabsContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.s3,
    backgroundColor: colors.t1,
  },
  feedTabStyle: tab => {
    return {
      left: -2,
      flex: 0.5,
      height: WP('14'),
      borderRadius: 10,
      color: colors.b1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tab ? colors.white : 'transparent',
    };
  },
  friendsTabStyle: tab => {
    return {
      flex: 0.5,
      height: WP('14'),
      color: colors.b1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tab ? colors.white : 'transparent',
    };
  },
  tabTxtStyle: tab => {
    return {
      fontSize: size.normal,
      color: tab ? colors.b1 : colors.g13,
      fontFamily: tab ? family.SFProText_Light : family.SFProText_Regular,
    };
  },
});

export default styles;
