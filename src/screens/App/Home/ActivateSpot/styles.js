import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
} from '../../../../shared/exporter';

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
  txtStyle: {
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
    backgroundColor: colors.t5,
  },
  markerStyle: {
    width: WP('11'),
    height: WP('11'),
  },
  bottonContainer: {
    flex: 0.21,
    alignItems: 'center',
    marginBottom: WP('2'),
    justifyContent: 'center',
  },
  btnsRowContainer: {
    width: '91%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxtStyle: {
    fontSize: size.xsmall,
  },
});
