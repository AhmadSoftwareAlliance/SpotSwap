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
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  boxContainer: {
    width: '100%',
    borderRadius: 15,
    padding: WP('5'),
    paddingTop: WP('4'),
    paddingBottom: WP('2'),
    backgroundColor: colors.t3,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imgStyle: {
    width: WP('7'),
    height: WP('7'),
    borderRadius: WP('7'),
  },
  innerView: {
    flex: 1,
    paddingHorizontal: WP('2.5'),
    marginTop: platformOrientedCode(0, WP('1')),
  },
  titleTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  bottomText: {
    color: colors.w1,
    fontSize: size.xsmall,
    paddingVertical: WP('2'),
    fontFamily: family.SFProText_Regular,
  },
  btn: {
    width: WP('18'),
    height: WP('4.5'),
    borderRadius: 100,
    marginTop: WP('1.2'),
    alignItems: 'center',
    backgroundColor: colors.p5,
  },
  btnText: {
    color: colors.b4,
    textAlign: 'center',
    fontSize: size.tiny,
    top: platformOrientedCode(-1.5, 1),
    fontFamily: family.SFProText_Medium,
  },
  mainContainer: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descText: {
    marginTop: WP('6'),
    color: colors.white,
    textAlign: 'center',
    marginBottom: WP('14'),
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_Regular,
  },
  confirmTextStyle: {
    color: colors.white,
    textAlign: 'center',
    paddingTop: WP('6'),
    fontSize: size.large,
    fontFamily: family.SFProText_Light,
  },
});

export default styles;
