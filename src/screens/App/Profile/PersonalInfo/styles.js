import {StyleSheet} from 'react-native';
import {
  WP,
  colors,
  scrHeight,
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
  contentContainerStyle: {
    height: scrHeight / 1.06,
  },
  imageContainer: {
    width: WP('35'),
    height: WP('35'),
    marginTop: WP('5'),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: WP('35'),
    justifyContent: 'center',
    backgroundColor: colors.t2,
  },
  imgStyle: {
    width: WP('26'),
    height: WP('26'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgRadiusStyle: {
    borderRadius: WP('25'),
  },
  bottomView: {
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: platformOrientedCode(WP('2'), WP('12')),
  },
});

export default styles;
