import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import {CHAT_URL} from '@env';
import {useIsFocused} from '@react-navigation/core';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  colors,
  appLogos,
  appIcons,
  appImages,
  platformOrientedCode,
} from '../../../../../shared/exporter';
import {
  AppLoader,
  ChatHeader,
  useChannel,
  useActionCable,
} from '../../../../../components';
import styles from './styles';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {
  getSupportMessagesRequest,
  sendSupportMessageRequest,
} from '../../../../../redux/actions';

const SupportChat = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [galleryImage, setGalleryImage] = useState('');

  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state?.auth);

  const {actionCable} = useActionCable(CHAT_URL, userInfo?.token);
  const {subscribe, unsubscribe} = useChannel(actionCable);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getChatMessages();
    }, 300);
  }, [isFocus, route]);

  useEffect(() => {
    try {
      subscribe(
        {
          channel: 'SupportConversationChannel',
          channel_key: `support_conversation_${route?.params?.convoId}`,
          support_conversation_id: route?.params?.convoId,
        },
        {
          received: msg => {
            setAllMessages(allMessages => [msg, ...allMessages]);
          },
          connected: () => {},
        },
      );
    } catch (err) {
      console.log('err', err);
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const getChatMessages = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('support_conversation_id', route?.params?.convoId);
    dispatch(
      getSupportMessagesRequest(
        params,
        res => {
          setAllMessages(res?.support_messages);
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Get Chats Error ==> ', err);
        },
      ),
    );
  };

  const onSend = (type, messageBody) => {
    setVisibility(true);
    const params = new FormData();
    params.append('support_conversation_id', route?.params?.convoId);
    params.append('body', messageBody);
    params.append('sender_id', userInfo?.id);
    if (type === 'message') {
      if (galleryImage !== '') {
        params.append('image', {
          name: galleryImage?.filename || 'image',
          uri: galleryImage?.path,
          type: galleryImage?.mime,
        });
      }
    }
    console.log('Parmas ==> ', params);
    dispatch(
      sendSupportMessageRequest(
        params,
        res => {
          if (type === 'message') {
            setMessage('');
            setGalleryImage('');
          }
          setVisibility(false);
        },
        err => {
          setVisibility(false);
          console.log('Error is ==> ', err);
        },
      ),
    );
  };

  //Gallery Handlers
  const showGallery = () => {
    setTimeout(() => {
      ImageCropPicker.openPicker({
        height: 400,
      }).then(image => {
        setGalleryImage(image);
      });
    }, 400);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.msgContainer}>
        {item?.sender_id === userInfo.id ? (
          // Sender Bubble
          <View>
            <View style={styles.senderBubble}>
              <View style={styles.senderBubbleStyles(item?.message_image)}>
                {item?.body && (
                  <Text style={styles.senderMsgStyle}>{item?.body}</Text>
                )}
                {item?.message_image && (
                  <Image
                    source={{uri: item.message_image}}
                    style={styles.msgImgStyle}
                  />
                )}
              </View>
              <Image
                source={
                  item?.sender_image
                    ? {uri: item?.sender_image}
                    : appLogos.textLogo
                }
                style={styles.personImgStyle}
              />
            </View>
            <Text style={styles.senderTimeStyle}>
              {moment(item?.created_at).calendar()}
            </Text>
          </View>
        ) : (
          // Receiver Bubble
          <View>
            <View style={styles.receiverBubble}>
              <View style={styles.receiverBubbleStyles(item?.message_image)}>
                {item?.body && (
                  <Text style={styles.receiverMsgStyle}>{item?.body}</Text>
                )}
                {item?.message_image && (
                  <Image
                    source={{uri: item.message_image}}
                    style={styles.msgImgStyle}
                  />
                )}
              </View>
            </View>
            <Text style={styles.receiverTimeStyle}>
              {moment(item?.created_at).calendar()}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <View style={styles.contentContainer}>
        <ChatHeader
          name={'Spot Swap Admin'}
          appLogo
          rightText
          userType="admin"
          onBackPress={() => navigation.goBack()}
          ticketNumber={route?.params?.ticketNumber}
        />
        <FlatList
          inverted
          data={allMessages}
          extraData={allMessages}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <Text style={styles.ticketTxtStyle}>You opened a ticket</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <KeyboardAvoidingView
          behavior={platformOrientedCode('height', 'padding')}>
          {
            <View style={styles.inputView}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder={'Enter your issue...'}
                  value={message}
                  ellipsizeMode="tail"
                  multiline
                  maxHeight={75}
                  onChangeText={text => setMessage(text)}
                  placeholderTextColor={colors.g4}
                  style={styles.inputStyles}
                />
              </View>
              <View style={styles.btnsRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => showGallery()}>
                  <Image
                    source={
                      galleryImage === ''
                        ? appIcons.gallery
                        : {
                            uri: platformOrientedCode(
                              galleryImage?.path,
                              galleryImage?.sourceURL,
                            ),
                          }
                    }
                    style={styles.galleryIconStyle}
                  />
                </TouchableOpacity>
                {visibility ? (
                  <View style={styles.indicatorStyle}>
                    <ActivityIndicator
                      animating
                      size={'small'}
                      color={colors.p1}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onSend('message', message)}
                    disabled={
                      galleryImage === '' && message === '' ? true : false
                    }>
                    <Image
                      source={appIcons.sendbutton}
                      style={styles.sendIconStyle}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default SupportChat;
