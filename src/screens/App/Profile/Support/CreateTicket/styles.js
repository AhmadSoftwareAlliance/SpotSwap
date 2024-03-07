import {StyleSheet} from 'react-native';
import {
  WP,
  colors,
  StatusBarHeight,
  platformOrientedCode,
  size,
  family,
} from '../../../../../shared/exporter';

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
    flex: 1,
    minHeight: platformOrientedCode('90%', '95%'),
  },
  titleText: {
    lineHeight: 34,
    fontSize: size.h2,
    color: colors.white,
    paddingBottom: WP('5'),
    fontFamily: family.SFProText_SemiBold,
  },
  inputView: {
    backgroundColor: colors.t1,
    borderRadius: 15,
    borderColor: colors.s3,
    borderWidth: 1,
  },
  inputStyle: {
    width: '100%',
    height: WP('35'),
    color: colors.white,
    paddingTop: WP('2'),
    textAlignVertical: 'top',
    paddingHorizontal: WP('3.2'),
  },
  countText: {
    textAlign: 'right',
    color: colors.white,
    paddingRight: WP('2'),
    paddingBottom: WP('2'),
  },
  bottomView: {
    bottom: WP('8'),
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  keyBoardStyle: {
    marginBottom: WP('20'),
  },
  errorText: {
    top: WP('1'),
    color: colors.s1,
    fontSize: size.tiny,
    fontFamily: family.SFProText_Regular,
  },
  msgText: {
    color: colors.g2,
    fontSize: size.tiny,
    paddingBottom: WP('2.5'),
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
