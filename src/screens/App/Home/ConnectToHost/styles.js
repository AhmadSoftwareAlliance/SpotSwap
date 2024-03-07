import {StyleSheet} from 'react-native';
import {
  WP,
  colors,
  StatusBarHeight,
  size,
  family,
  platformOrientedCode,
} from '../../../../shared/exporter';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
  },
  headerView: {
    flex: 0.15,
    top: StatusBarHeight,
    marginBottom: WP('8'),
    paddingHorizontal: WP('6'),
  },
  infoContainer: {
    width: '100%',
    borderRadius: 15,
    marginHorizontal: WP('4'),
    backgroundColor: colors.t1,
  },
  boxContainer: {
    width: '91.5%',
    borderRadius: 15,
    padding: WP('5'),
    marginTop: WP('4'),
    paddingTop: WP('4'),
    marginBottom: WP('3'),
    paddingBottom: WP('2'),
    marginHorizontal: WP('4'),
    backgroundColor: colors.t3,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  innerView: {
    flex: 1,
    paddingHorizontal: WP('2.5'),
    marginTop: platformOrientedCode(0, WP('1')),
  },
  btn: {
    width: WP('12'),
    height: WP('4.5'),
    borderRadius: 100,
    marginTop: WP('1.2'),
    alignItems: 'center',
    backgroundColor: colors.p5,
  },
  btnText: {
    color: colors.b4,
    textAlign: 'center',
    fontSize: size.tiny,
    top: platformOrientedCode(-1, 1),
    fontFamily: family.SFProText_Medium,
  },
  titleTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  imgStyle: {
    width: WP('7'),
    height: WP('7'),
    borderRadius: WP('7'),
  },
  bottomText: {
    color: colors.w1,
    fontSize: size.xsmall,
    paddingVertical: WP('2'),
    fontFamily: family.SFProText_Regular,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: WP('0.5'),
    marginHorizontal: WP('4'),
  },
  mapStyle: {
    height: '110%',
  },
  markerContainer: {
    height: WP('12'),
    width: WP('12'),
    borderRadius: WP('12'),
    backgroundColor: colors.s8,
  },
  orginMarkerStyle: {
    height: WP('11'),
    width: WP('11'),
  },
  destMarkerStyle: {
    height: WP('12'),
    width: WP('12'),
    borderRadius: WP('12'),
  },
  bottomView: {
    alignItems: 'center',
    marginBottom: WP('5'),
    justifyContent: 'center',
  },
  etaTxtStyle: {
    maxWidth: '75%',
    alignSelf: 'center',
    color: colors.white,
    fontSize: size.xsmall,
    paddingBottom: WP('1'),
    fontFamily: family.SFProText_Regular,
  },
  timeTxtStyle: {
    fontSize: size.h5,
    alignSelf: 'center',
    color: colors.white,
    paddingVertical: WP('1'),
    fontFamily: family.SFProText_SemiBold,
  },
  dividerView: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    marginVertical: WP('4'),
    backgroundColor: colors.g4,
  },
  innerRowContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carImageStyle: {
    height: WP('9'),
    width: WP('16'),
  },
  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
