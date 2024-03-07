import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  titleText: {
    fontSize: size.h4,
    color: colors.white,
    textAlign: 'center',
    fontFamily: family.SFProText_SemiBold,
  },
  subText: {
    color: colors.w1,
    marginTop: WP('3'),
    textAlign: 'center',
    fontSize: size.normal,
    marginBottom: WP('3'),
    fontFamily: family.SFProText_Regular,
  },
  timerTxtStyle: {
    marginTop: WP('7'),
    color: colors.white,
    textAlign: 'center',
    fontSize: size.huge - 2,
    fontFamily: family.SFProText_SemiBold,
  },
  bottomView: {
    bottom: WP('15'),
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  cancelText: {
    marginTop: WP('6'),
    color: colors.white,
    textAlign: 'center',
    fontSize: size.large,
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
