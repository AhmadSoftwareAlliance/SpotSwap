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
  bgImg2: {
    width: WP('92'),
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    height: platformOrientedCode(WP('70'), WP('66')),
    paddingHorizontal:WP(3)
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
  modalContainer: {
    width: '95%',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: WP('1.5'),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: platformOrientedCode(WP('3'), 0),
  },
  iconStyle: {
    padding: WP('3'),
  },
  titleTxtStyle2: isButton => {
    return {
      color: colors.b1,
      textAlign: 'center',
      fontSize: size.xxlarge,
      paddingHorizontal: WP('6.5'),
      fontFamily: family.SFProText_SemiBold,
      paddingTop: isButton ? WP('7.5') : WP('1'),
    };
  },
  descTxtStyle: isDesc => {
    return {
      color: colors.b1,
      textAlign: 'center',
      paddingTop: WP('3.5'),
      fontSize: size.normal,
      paddingHorizontal: WP('6.5'),
      paddingBottom: isDesc ? WP('5') : 0,
      fontFamily: family.SFProText_Regular,
    };
  },
  cancelTxtStyle: {
    color: colors.b3,
    paddingTop: WP('4'),
    fontSize: size.normal,
    paddingBottom: WP('5'),
    fontFamily: family.SFProText_Regular,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default styles;
