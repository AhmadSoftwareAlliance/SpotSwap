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
  historyContainer: {
    paddingHorizontal: WP('5'),
  },
  historyRow: {
    flex: 1,
    marginTop: WP('3'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  parkingTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  priceTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  dateTxtStyle: {
    color: colors.w1,
    marginTop: WP('1'),
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  dividerView: {
    height: 1,
    width: '100%',
    marginTop: WP('3'),
    marginBottom: WP('1.2'),
    backgroundColor: colors.g8,
  },
});

export default styles;
