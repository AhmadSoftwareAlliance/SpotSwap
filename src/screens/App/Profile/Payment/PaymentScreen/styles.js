import {StyleSheet} from 'react-native';
import {
  size,
  WP,
  colors,
  family,
  StatusBarHeight,
  platformOrientedCode,
} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  addIconStyle: {
    width: WP('6'),
    height: WP('6'),
    tintColor: colors.g11,
  },
  addBtnStyle: {
    borderWidth: 2,
    borderRadius: 10,
    padding: WP('10'),
    alignSelf: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: colors.g11,
    justifyContent: 'center',
    marginVertical: WP('12'),
    backgroundColor: colors.b3,
  },
  scrollViewStyle: {
    marginBottom: WP('5'),
  },
  backBtnsContainer: {
    flex: 1,
    paddingLeft: 15,
    marginTop: WP('5.3'),
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
    width: 49,
    borderRadius: 10,
    backgroundColor: colors.p6,
    height: platformOrientedCode(WP('18'), WP('17')),
  },
  backRightBtnRight: {
    right: 0,
    width: 48,
    borderRadius: 10,
    backgroundColor: colors.s5,
    height: platformOrientedCode(WP('18'), WP('17')),
  },
  editIconStyle: {
    width: WP('6'),
    height: WP('6'),
  },
  delIconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  mainContainer: {
    borderRadius: 10,
    padding: WP('3.3'),
    marginTop: WP('5'),
    flexDirection: 'row',
    backgroundColor: colors.t1,
  },
  imgStyle: {
    width: WP('15'),
    height: WP('10'),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  innerView: {
    paddingHorizontal: WP('3.3'),
  },
  titleText: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  subTitle: {
    color: colors.w1,
    fontSize: size.tiny,
    paddingVertical: WP('1'),
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
