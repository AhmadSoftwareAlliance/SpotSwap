import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
  platformOrientedCode,
} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  regTxtStyle: {
    marginTop: WP('5'),
    textAlign: 'right',
    color: colors.white,
    alignSelf: 'flex-end',
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  logoStyle: {
    height: WP('22'),
    width: WP('51.5'),
    alignSelf: 'center',
    marginTop: WP('6.5'),
  },
  forgotTxtStyle: {
    right: WP('1'),
    color: colors.g2,
    textAlign: 'right',
    marginTop: WP('1'),
    alignSelf: 'flex-end',
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  orViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineView: {
    height: 1,
    width: WP('38'),
    backgroundColor: colors.g3,
  },
  orTxtStyle: {
    color: colors.g3,
    textAlign: 'right',
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: WP('9'),
    height: WP('9'),
    marginHorizontal: 5,
  },
  bottomView: {
    bottom: WP('12'),
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  descTxtStyle: {
    color: colors.g4,
    textAlign: 'center',
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
    bottom: platformOrientedCode(WP('10'), WP('5')),
  },
});

export default styles;
