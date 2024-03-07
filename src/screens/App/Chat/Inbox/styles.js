import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
  platformOrientedCode,
} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.b1,
    paddingTop: StatusBarHeight,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: WP('5'),
    backgroundColor: colors.b6,
  },
  msgContainer: {
    marginTop: WP('5'),
    marginBottom: WP('4'),
  },
  senderBubble: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  senderBubbleStyles: isImage => {
    return {
      padding: 15,
      marginRight: 5,
      paddingTop: 13,
      borderRadius: 20,
      maxWidth: '85.25%',
      flex: isImage ? 1 : 0,
      borderBottomEndRadius: 0,
      backgroundColor: colors.p8,
    };
  },
  senderMsgStyle: {
    color: colors.white,
    fontSize: size.xxsmall,
    fontFamily: family.SFProText_Regular,
  },
  senderTimeStyle: {
    right: WP('6.2'),
    color: colors.w2,
    marginTop: WP('1'),
    fontSize: size.xxtiny,
    alignSelf: 'flex-end',
    fontFamily: family.SFProText_Light,
  },
  // Receiver Bubble
  receiverBubble: {
    flex: 1,
    flexDirection: 'row',
  },
  receiverBubbleStyles: isImage => {
    return {
      padding: 15,
      marginLeft: 5,
      paddingTop: 13,
      borderRadius: 20,
      maxWidth: '86.1%',
      flex: isImage ? 1 : 0,
      borderBottomStartRadius: 0,
      backgroundColor: colors.t4,
    };
  },
  imgStyle: {
    top: WP('5'),
    width: WP('13.5'),
    height: WP('13.5'),
    borderRadius: WP('13.5'),
  },
  receiverMsgStyle: {
    color: colors.w1,
    fontSize: size.xxsmall,
    fontFamily: family.SFProText_Regular,
  },
  receiverTimeStyle: {
    left: WP('6.8'),
    color: colors.w2,
    marginTop: WP('1'),
    fontSize: size.xxtiny,
    fontFamily: family.SFProText_Light,
  },
  personImgStyle: {
    bottom: 1,
    width: WP('5.5'),
    height: WP('5.5'),
    alignSelf: 'flex-end',
    borderRadius: WP('5.5'),
    backgroundColor: colors.g2,
  },
  msgImgStyle: {
    width: '100%',
    height: WP('40'),
    borderRadius: 10,
    marginTop: WP('1.5'),
  },
  inputView: {
    height: WP('14'),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.t4,
    paddingHorizontal: WP('2'),
    justifyContent: 'space-between',
    marginBottom: platformOrientedCode(WP('2'), WP('10')),
  },
  inputWrapper: {
    width: '80%',
    justifyContent: 'center',
  },
  inputStyles: {
    width: '95%',
    paddingRight: 5,
    color: colors.white,
    paddingLeft: WP('2'),
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Light,
    paddingVertical: platformOrientedCode(WP('1'), WP('2')),
  },
  btnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryIconStyle: {
    width: WP('6'),
    height: WP('6'),
    right: WP('2'),
    borderRadius: WP('1'),
  },
  sendIconStyle: {
    width: WP('11'),
    height: WP('9'),
  },
  indicatorStyle: {
    width: WP('11'),
    height: WP('9'),
    justifyContent: 'center',
  },
  blockStyle: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: WP('4'),
    justifyContent: 'center',
    backgroundColor: colors.p1,
  },
  blockText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: size.large,
    textAlignVertical: 'center',
    fontFamily: family.SFProText_SemiBold,
  },
  addIconContainer: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: colors.p7,
    marginBottom: WP('3.5'),
    justifyContent: 'center',
    paddingVertical: WP('2'),
    paddingHorizontal: WP('5'),
  },
  chatItemContainer: {
    borderRadius: 15,
    marginLeft: WP('2'),
    alignItems: 'center',
    marginBottom: WP('3.5'),
    justifyContent: 'center',
    paddingVertical: WP('2'),
    paddingHorizontal: WP('5'),
    backgroundColor: colors.p8,
  },
  addIconStyle: {
    width: WP('5'),
    height: WP('5'),
    tintColor: colors.p7,
  },
  chatTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    top: platformOrientedCode(-1, 1),
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
