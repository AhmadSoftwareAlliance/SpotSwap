import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
} from '../../../../shared/exporter';
import { Dimensions } from "react-native";
export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
  },
  mapStyle: {
    height: '100%',
    // height:HP(100)
  },
  headerView: {
    zIndex: 99,
    width: '100%',
    position: 'absolute',
    top: StatusBarHeight,
    paddingHorizontal: WP('5'),
  },
  orginMarkerStyle: {
    height: WP('9'),
    width: WP('9'),
  },
  destMarkerStyle: {
    height: WP('12'),
    width: WP('12'),
  },
  bottomView: {
    bottom: 20,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  txtStyle: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_SemiBold,
  },
  locationsContainer: {
    width: '92%',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: WP('4'),
    borderColor: colors.s3,
    marginVertical: WP('2'),
    paddingHorizontal: WP('3'),
    backgroundColor: colors.g7,
  },
  innerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  originIconStlye: {
    width: WP('4'),
    height: WP('4'),
  },
  locIconStlye: {
    top: -2,
    width: WP('4'),
    height: WP('4.5'),
  },
  locTxtStyle: {
    color: colors.w1,
    paddingLeft: WP('2'),
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  dividerView: {
    height: 1,
    width: '93%',
    marginTop: WP('3.5'),
    alignSelf: 'flex-end',
    backgroundColor: colors.w1,
  },
  buttonsContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnsSpacer: {
    width: WP('2'),
  },
  btnTxtStyle: {
    lineHeight: 19,
    fontSize: size.xsmall,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
},
});
