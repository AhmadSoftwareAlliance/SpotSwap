import {StyleSheet} from 'react-native';
import {WP, size, colors, family, HP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // alignItems: 'center',
    paddingBottom: WP('20'),
    // justifyContent: 'center',
    paddingTop:HP("5"),
    paddingHorizontal: WP('5'),
    backgroundColor: colors.b1,
  },
  rootInerContainer:{
    paddingTop:HP("15"),
  },
  passTxtStyle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: size.title,
    fontFamily: family.SFProText_SemiBold,
  },
  descTxtStyle: {
    color: colors.w1,
    marginTop: WP('3'),
    textAlign: 'center',
    fontSize: size.normal,
    fontFamily: family.SFProText_Regular,
  },
  bottomView: {
    bottom: WP('12'),
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default styles;
