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
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  alertTxtStyle: {
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_SemiBold,
  },
  descTxtStyle: {
    color: colors.w1,
    fontSize: size.normal,
    paddingTop: WP('2.5'),
    fontFamily: family.SFProText_Regular,
  },
  labelTxtStyle: {
    color: colors.g2,
    fontSize: size.tiny,
    paddingBottom: WP('2.5'),
    fontFamily: family.SFProText_Regular,
  },
  bottomView: {
    marginTop: WP('2'),
    alignSelf: 'center',
    marginBottom: WP('15'),
    justifyContent: 'center',
  },
});

export default styles;
