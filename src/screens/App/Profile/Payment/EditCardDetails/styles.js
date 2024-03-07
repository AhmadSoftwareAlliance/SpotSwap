import {StyleSheet} from 'react-native';
import {WP, colors, StatusBarHeight} from '../../../../../shared/exporter';

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
  contentContainer: {
    flex: 1,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomView: {
    marginTop: WP('2'),
    alignSelf: 'center',
    marginBottom: WP('12'),
    justifyContent: 'center',
  },
});
export default styles;
