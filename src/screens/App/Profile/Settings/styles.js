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
  iconStyle: {
    height: WP('6'),
    width: WP('5.5'),
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
itemContainer: {
    height: 51,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('4'),
    paddingHorizontal: WP('5'),
    backgroundColor: colors.t1,
  },
  itemIconStyle: {
    width: 20,
    height: 20,
  },
  itemTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    marginLeft: WP('2.5'),
    fontFamily: family.SFProText_Regular,
  },
  hTxtStyle: {
    marginTop: WP('3'),
    color: colors.white,
    fontSize: size.normal,
    marginBottom: WP('7'),
    fontFamily: family.SFProText_SemiBold,
  },
});

export default styles;
