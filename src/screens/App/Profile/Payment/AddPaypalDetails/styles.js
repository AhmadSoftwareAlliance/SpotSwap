import {StyleSheet} from 'react-native';
import {WP, colors, StatusBarHeight} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBarHeight,
  },
  webViewStyle: {
    width: '100%',
    marginTop: 10,
  },
  headerContainer: {
    paddingHorizontal: WP('5'),
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingHorizontal: WP('5'),
    paddingTop: StatusBarHeight,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  bottomView: {
    bottom: WP('12'),
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default styles;
