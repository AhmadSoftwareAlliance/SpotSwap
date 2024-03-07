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
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  regTxtStyle: {
    marginTop: WP('5'),
    textAlign: 'right',
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  logoStyle: {
    height: WP('22'),
    width: WP('51.5'),
    alignSelf: 'center',
    marginTop: WP('6.5'),
  },
});

export default styles;
