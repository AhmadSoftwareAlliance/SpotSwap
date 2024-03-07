import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
} from '../../../shared/exporter';

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
  passTxtStyle: {
    color: colors.white,
    fontSize: size.title,
    fontFamily: family.SFProText_SemiBold,
  },
  nameTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  imgStyle: {
    width: '100%',
    height: WP('54'),
    borderRadius: 15,
    marginTop: WP('3'),
    backgroundColor: colors.g6,
    // backgroundColor: "#ffff",
  },
  uploadTxtStyle: {
    marginBottom: 7,
    color: colors.g2,
    marginTop: WP('6'),
    fontSize: size.tiny,
    fontFamily: family.SFProText_Regular,
  },
  bottomView: {
    bottom: 16,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
  pickImgViewStyle: {
    flex: 0.5,
    borderWidth: 1,
    height: WP('31'),
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: colors.p4,
    justifyContent: 'center',
  },
  itemImgStyle: {
    flex: 0.5,
    height: WP('31'),
    borderRadius: 10,
    marginBottom: 10,
  },
  spaceView: {
    width: 10,
  },
});

export default styles;
