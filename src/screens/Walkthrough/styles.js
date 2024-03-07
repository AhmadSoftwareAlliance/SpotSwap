import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  scrWidth,
  scrHeight,
  StatusBarHeight,
} from '../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
  },
  videoStyle: {
    flex: 1,
    width: scrWidth,
    height: scrHeight,
    backgroundColor: colors.b1,
  },
  buttonCircle: {
    width: scrWidth,
    position: 'absolute',
    top: StatusBarHeight,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
  },
  skipTxtStyle: {
    right: WP('5'),
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
