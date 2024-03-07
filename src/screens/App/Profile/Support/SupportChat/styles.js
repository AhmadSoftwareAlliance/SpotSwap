import {StyleSheet} from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  StatusBarHeight,
  platformOrientedCode,
} from '../../../../../shared/exporter';

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
  ticketTxtStyle: {
    color: colors.w2,
    alignSelf: 'center',
    fontSize: size.xsmall,
    paddingBottom: WP('8'),
    fontFamily: family.SFProText_Medium,
  },
  msgContainer: {
    marginTop: WP('2'),
    marginBottom: WP('3'),
  },
  senderBubble: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  senderBubbleStyles: isImage => {
    return {
      flex: isImage ? 1 : 0,
      padding: 15,
      marginRight: 5,
      paddingTop: 13,
      maxWidth: '86%',
      borderRadius: 10,
      backgroundColor: colors.p8,
    };
  },
  senderMsgStyle: {
    width: '100%',
    color: colors.white,
    fontSize: size.xxsmall,
    fontFamily: family.SFProText_Regular,
  },
  senderTimeStyle: {
    right: WP('6.8'),
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
      paddingTop: 13,
      borderRadius: 10,
      maxWidth: '86.1%',
      flex: isImage ? 1 : 0,
      backgroundColor: colors.s9,
    };
  },
  imgStyle: {
    top: WP('5'),
    width: WP('13.5'),
    height: WP('13.5'),
    borderRadius: WP('13.5'),
  },
  receiverMsgStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.SFProText_Regular,
  },
  receiverTimeStyle: {
    left: WP('0.5'),
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
    backgroundColor: colors.g3,
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
  flStyle: {
    alignItems: 'baseline',
  },
  questionsContainer: {
    padding: 15,
    flexShrink: 0,
    borderWidth: 1,
    marginRight: 5,
    paddingTop: 13,
    borderRadius: 10,
    marginTop: WP('2'),
    marginBottom: WP('2'),
    borderColor: colors.p5,
    backgroundColor: colors.s9,
  },
  questionTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    alignSelf: 'flex-start',
    fontFamily: family.SFProText_Regular,
  },
});

export default styles;
