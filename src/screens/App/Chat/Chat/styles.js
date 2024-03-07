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
    paddingHorizontal: WP('4'),
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
  backRightBtnLeft: isBlocked => {
    return {
      right: 52,
      width: 48,
      borderRadius: 5,
      height: WP('19.7'),
      backgroundColor: isBlocked ? colors.s6 : colors.y1,
    };
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
