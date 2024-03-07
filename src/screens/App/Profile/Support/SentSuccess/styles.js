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
  mainContainer: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    lineHeight: 34,
    fontSize: size.h2,
    color: colors.white,
    textAlign: 'center',
    fontFamily: family.SFProText_SemiBold,
  },
  text: {
    lineHeight: 20,
    color: colors.w1,
    textAlign: 'center',
    paddingTop: WP('3'),
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_Light,
  },
});

export default styles;
