import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: WP('5'),
    backgroundColor: colors.b1,
    paddingTop: StatusBarHeight,
  },
  titleTxtStyle: {
    color: colors.white,
    paddingTop: WP('5'),
    fontSize: size.title,
    fontFamily: family.SFProText_SemiBold,
  },
  contentContainer: {
    marginTop: WP('3'),
    paddingBottom: WP('1.5'),
  },
  txtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Medium,
  },
});

export default styles;
