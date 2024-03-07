import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
  HP,
} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  passTxtStyle: {
    color: colors.white,
    fontSize: size.title,
    fontFamily: family.SFProText_SemiBold,
  },
  descTxtStyle: {
    color: colors.w1,
    marginTop: WP('3'),
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  cellStyle: {
    borderRadius: 5,
    width: WP('11.5'),
    height: WP('13.3'),
    alignItems: 'center',
    marginVertical: HP('2'),
    justifyContent: 'center',
    backgroundColor: colors.t1,
  },
  txtStyle: {
    color: colors.w1,
    textAlign: 'center',
    fontSize: size.large,
    fontFamily: family.SFProText_Regular,
  },
  notReceivedTxtStyle: {
    color: colors.w1,
    textAlign: 'center',
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  resendTxtStyle: {
    color: colors.p3,
    fontFamily: family.SFProText_SemiBold,
  },
});

export default styles;
