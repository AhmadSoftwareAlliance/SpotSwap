import {StyleSheet} from 'react-native';
import {WP, colors, StatusBarHeight} from '../../../../shared/exporter';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
  },
  headerView: {
    flex: 0.14,
    top: StatusBarHeight,
    marginBottom: WP('6'),
    paddingHorizontal: WP('6'),
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: WP('4'),
  },
  mapStyle: {
    height: '110%',
  },
  markerContainer: {
    width: WP('12'),
    height: WP('12'),
    alignItems: 'center',
    borderRadius: WP('12'),
    justifyContent: 'center',
    backgroundColor: colors.s8,
  },
  originMarkerStyle: {
    width: WP('11'),
    height: WP('11'),
    borderRadius: WP('11'),
  },
  markerStyle: {
    width: WP('8'),
    height: WP('8'),
    borderRadius: WP('8'),
  },
  bottonContainer: {
    flex: 0.21,
    bottom: WP('2'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
