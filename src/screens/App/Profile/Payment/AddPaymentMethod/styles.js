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
  rowContainer: {
    borderWidth: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'dashed',
    marginTop: WP('11.5'),
    marginBottom: WP('9'),
    borderColor: colors.g11,
    paddingVertical: WP('11'),
    backgroundColor: colors.b5,
    paddingHorizontal: WP('12'),
    justifyContent: 'space-between',
  },
  cardStyle: {
    width: WP('12'),
    height: WP('8.5'),
  },
  masterCardStyle: {
    width: WP('11'),
    height: WP('6.5'),
  },
  visaCardStyle: {
    width: WP('12'),
    height: WP('4'),
  },
  textStyle: {
    color: colors.white,
    fontSize: size.large,
    marginBottom: WP('5.5'),
    fontFamily: family.SFProText_SemiBold,
  },
  itemContainer: {
    borderRadius: 10,
    padding: WP('6'),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('4'),
    backgroundColor: colors.t1,
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  titleStyle: {
    color: colors.white,
    fontSize: size.normal,
    marginHorizontal: WP('3.2'),
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
