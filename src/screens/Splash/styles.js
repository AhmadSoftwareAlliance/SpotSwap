import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.g1,
  },
  logoStyle: {
    height: WP('22'),
    width: WP('51.5'),
  },
  logoTxtStyle: {
    marginTop: WP('5'),
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.SFProText_SemiBold,
  },
});

export default styles;
