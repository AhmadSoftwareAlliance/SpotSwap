import {StyleSheet} from 'react-native';
import {
  WP,
  colors,
  StatusBarHeight,
  size,
  family,
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
  innerView: {
    flex: 1,
    paddingHorizontal: WP('2.5'),
    marginTop: platformOrientedCode(0, WP('1')),
  },
  btn: {
    height: WP('4.5'),
    borderRadius: 100,
    marginTop: WP('1.2'),
    alignItems: 'center',
    backgroundColor: colors.p5,
    paddingHorizontal: WP('2.5'),
  },
  btnText: {
    color: colors.b4,
    textAlign: 'center',
    fontSize: size.tiny,
    top: platformOrientedCode(-1.5, 1),
    fontFamily: family.SFProText_Medium,
  },
  bottomText: {
    color: colors.w1,
    fontSize: size.xsmall,
    paddingVertical: WP('2'),
    fontFamily: family.SFProText_Regular,
  },
  boxView: {
    width: '100%',
    borderRadius: 15,
    marginTop: WP('4'),
    paddingBottom: WP('8'),
    paddingHorizontal: WP('5'),
    backgroundColor: colors.t3,
  },
  titleTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  rowStyle: {
    marginTop: WP('5.5'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hTxtStyle: {
    flex: 0.35,
    color: colors.w1,
    fontSize: size.xsmall,
    alignSelf: 'flex-start',
    fontFamily: family.SFProText_Regular,
  },
  valTxtStyle: title => {
    return {
      flex: 0.65,
      textAlign: 'right',
      fontSize: size.normal,
      fontFamily: family.SFProText_SemiBold,
      color: title === 'Total' ? colors.p7 : colors.white,
    };
  },
  imgStyle: {
    width: WP('7'),
    height: WP('7'),
    borderRadius: WP('7'),
    backgroundColor: colors.g6,
  },
});

export default styles;
