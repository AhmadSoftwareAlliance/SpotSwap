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
    paddingVertical: StatusBarHeight,
  },
  iconStyle: {
    height: WP('6'),
    width: WP('5.5'),
  },
  headerView: {
    width: WP('72'),
    marginTop: WP('2'),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('2'),
    paddingHorizontal: WP('2'),
  },
  imageContainer: {
    marginRight: 9,
    width: WP('14'),
    height: WP('14'),
    marginTop: WP('2'),
    alignItems: 'center',
    borderRadius: WP('14'),
    justifyContent: 'center',
    backgroundColor: colors.t2,
  },
  imgStyle: {
    width: WP('9.5'),
    height: WP('9.5'),
    borderRadius: WP('9.5'),
  },
  nameTxtStyle: {
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.SFProText_SemiBold,
  },
  carTxtStyle: {
    marginTop: 4,
    color: colors.w1,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Medium,
  },
  codeBoxView: {
    width: '100%',
    borderRadius: 15,
    padding: WP('5'),
    marginTop: WP('1'),
    marginBottom: WP('-1'),
    backgroundColor: colors.t3,
  },
  boxView: {
    width: '100%',
    borderRadius: 15,
    padding: WP('5'),
    marginTop: WP('4'),
    backgroundColor: colors.t3,
  },
  paddingHorizontal: {
    paddingHorizontal: 0,
  },
  titleTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_SemiBold,
  },
  marginBottom: {
    marginBottom: WP('2'),
  },
  txtPaddingHorizontal: {
    marginBottom: WP('2'),
    marginHorizontal: WP('5'),
  },
  rowStyle: {
    marginTop: WP('5.5'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hTxtStyle: {
    color: colors.w1,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  valTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_SemiBold,
  },
  flStyle: {
    marginTop: WP('2'),
  },
  itemImgStyle: {
    flex: 0.5,
    height: WP('29'),
    borderRadius: 10,
    marginTop: WP('2.5'),
    backgroundColor: colors.b3,
  },
  spaceView: {
    width: 10,
  },
  historyContainer: {
    paddingHorizontal: WP('5'),
  },
  historyRow: {
    marginTop: WP('3'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  parkingTxtStyle: {
    width: '88%',
    color: colors.white,
    fontSize: size.xsmall,
    alignSelf: 'flex-start',
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
