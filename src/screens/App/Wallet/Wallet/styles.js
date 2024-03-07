import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
  platformOrientedCode,
} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: WP('5'),
    backgroundColor: colors.b1,
    paddingTop: StatusBarHeight,
  },
  mainContainer: {
    alignItems: 'center',
    paddingVertical: WP('5'),
  },
  titleTxtStyle: {
    marginTop: WP('10'),
    color: colors.white,
    marginBottom: WP('7'),
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_SemiBold,
  },
  bgImg: {
    width: WP('92'),
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    height: platformOrientedCode(WP('50'), WP('46')),
  },
  textStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Light,
  },
  balanceTxtStyle: {
    marginTop: WP('2'),
    color: colors.white,
    textAlign: 'center',
    fontSize: size.xxtitle,
    marginBottom: WP('5.5'),
    fontFamily: family.SFProText_SemiBold,
  },
  dividerView: {
    height: 2,
    width: WP('39'),
    marginTop: platformOrientedCode(0, WP('2.5')),
    marginBottom: WP('4'),
    backgroundColor: colors.g12,
  },
  btnText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.white,
    fontSize: size.xsmall,
  },
});

export default styles;
