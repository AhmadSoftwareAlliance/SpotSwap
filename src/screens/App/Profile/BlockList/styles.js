import {StyleSheet} from 'react-native';
import {colors, StatusBarHeight, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  backBtnsContainer: {
    flex: 1,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backRightBtn: {
    top: 0,
    bottom: 0,
    width: 85,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  backRightBtnLeft: {
    right: 52,
    width: 48,
    borderRadius: 5,
    height: WP('19.7'),
    backgroundColor: colors.s6,
  },
  backRightBtnRight: {
    right: 0,
    width: 48,
    borderRadius: 5,
    height: WP('19.7'),
    backgroundColor: colors.s5,
  },
  blockIconStyle: {
    width: WP('4.5'),
    height: WP('4.5'),
  },
  delIconStyle: {
    width: WP('4.5'),
    height: WP('5'),
  },
});

export default styles;
