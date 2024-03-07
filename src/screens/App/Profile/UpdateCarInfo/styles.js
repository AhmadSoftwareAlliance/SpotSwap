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
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingVertical: StatusBarHeight,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  passTxtStyle: {
    color: colors.white,
    fontSize: size.title,
    fontFamily: family.SFProText_SemiBold,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP('1'),
  },
  iconStyle: {
    width: WP('7'),
    height: WP('7'),
  },
  showTxtStyle: {
    left: WP('2'),
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_SemiBold,
  },
  uploadTxtStyle: {
    marginBottom: 7,
    color: colors.g2,
    marginTop: WP('6'),
    fontSize: size.tiny,
    fontFamily: family.SFProText_Regular,
  },
  itemContainer: {
    width: '49%',
  },
  pickImgViewStyle: {
    width: '95%',
    marginLeft: 5,
    borderWidth: 1,
    height: WP('31'),
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: colors.p4,
    justifyContent: 'center',
  },
  itemImgStyle: index => {
    return {
      width: '95%',
      height: WP('31'),
      borderRadius: 10,
      marginBottom: 10,
      marginLeft: index % 2 === 0 ? 5 : 10,
      backgroundColor: colors.b3,
    };
  },
});

export default styles;
