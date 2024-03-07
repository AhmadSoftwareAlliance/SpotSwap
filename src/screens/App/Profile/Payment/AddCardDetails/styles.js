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
  scrollViewStyle: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  labelTxtStyle: {
    color: colors.g2,
    fontSize: size.tiny,
    paddingBottom: WP('2.5'),
    fontFamily: family.SFProText_Regular,
  },
  cardStyle: {
    borderRadius: 10,
    fontSize: size.normal,
    textColor: colors.white,
    backgroundColor: colors.g5,
    placeholderColor: colors.white,
    fontFamily: family.SFProText_Regular,
  },
  payStyle: {
    width: '100%',
    borderWidth: 1,
    height: WP('14'),
    borderRadius: 10,
    borderColor: colors.s3,
    textColor: colors.white,
  },
  errorTxtStyle: {
    top: WP('1'),
    color: colors.s1,
    fontSize: size.tiny,
    fontFamily: family.SFProText_Regular,
  },
  bottomView: {
    marginTop: WP('2'),
    alignSelf: 'center',
    marginBottom: WP('12'),
    justifyContent: 'center',
  },
});

export default styles;
