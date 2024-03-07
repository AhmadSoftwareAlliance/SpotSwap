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
  appIcons,
  appLogos,
  appImages,
  platformOrientedCode,
} from '../../../../shared/exporter';
import {
  AppLoader,
  ChatHeader,
  useChannel,
  useActionCable,
} from '../../../../components';
import styles from './styles';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {
  getMessagesRequest,
  sendMessageRequest,
  getQuickChatsRequest,
} from '../../../../redux/actions';

const Inbox = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [allMessages, setAllMessages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [galleryImage, setGalleryImage] = useState('');

  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state?.auth);

  const {actionCable} = useActionCable(CHAT_URL, userInfo?.token);
  const {subscribe, unsubscribe} = useChannel(actionCable);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      Promise.all([getChatMessages(), getQuickChats()]);
      getChatMessages();
    }, 300);
  }, [isFocus, route]);

  useEffect(() => {
    try {
      subscribe(
        {
          channel: 'ConversationChannel',
          channel_key: `conversation_${route?.params?.item?.id}`,
          conversation_id: route?.params?.item?.id,
        },
        {
          received: res => {
            if (res?.type === 'user_status') {
              if (userType === 'Host') {
                setIsOnline(res?.recipient_online_status);
              } else {
                setIsOnline(res?.sender_online_status);
              }
            } else {
              if (res?.type === 'user_message') {
                setAllMessages(allMessages => [res, ...allMessages]);
              }
            }
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
    params.append('conversation_id', route?.params?.item?.id);
    dispatch(
      getMessagesRequest(
        params,
        res => {
          setUserType(res?.user_type);
          if (res?.user_type === 'Host') {
            setIsOnline(res?.recipient_online_status);
          } else {
            setIsOnline(res?.sender_online_status);
          }
          setAllMessages(res?.messages);
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Get Chats Error ==> ', err);
        },
      ),
    );
  };

  const getQuickChats = () => {
    setIsLoading(true);
    dispatch(
      getQuickChatsRequest(
        res => {
          setIsLoading(false);
          setChats(res?.chats);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const onSend = (type, messageBody) => {
    setVisibility(true);
    const params = new FormData();
    params.append('conversation_id', route?.params?.item?.id);
    params.append('body', messageBody);
    if (type === 'typed_message') {
      if (galleryImage !== '') {
        params.append('image', {
          name: galleryImage?.filename || 'image',
          uri: galleryImage?.path,
          // type: galleryImage?.mime,
        });
      }
    }
    dispatch(
      sendMessageRequest(
        params,
        res => {
          if (type === 'typed_message') {
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
              <Image
                source={
                  item?.sender_image
                    ? {uri: item?.sender_image}
                    : appLogos.textLogo
                }
                style={styles.personImgStyle}
              />
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

  const renderQuickChats = ({item, index}) => {
    return index === 0 ? (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addIconContainer}
        onPress={() => {
          if (route?.params?.item?.is_blocked) {
            console.log('Conversation is blocked');
          } else {
            navigation.navigate('AddQuickChat', {
              screen: 'Inbox',
              item: route?.params?.item,
            });
          }
        }}>
        <Image source={appIcons.addIcon} style={styles.addIconStyle} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.chatItemContainer}
        onPress={() => {
          if (route?.params?.item?.is_blocked) {
            console.log('Conversation is blocked');
          } else {
            onSend('quick_chat', item?.message);
          }
        }}>
        <Text style={styles.chatTxtStyle}>{item?.message}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <View style={styles.contentContainer}>
        <ChatHeader
          isOnline={isOnline}
          userType={userType}
          name={
            userType === 'Host'
              ? route?.params?.item?.recepient_name
              : route?.params?.item?.sender_name
          }
          source={
            userType === 'Host'
              ? route?.params?.item?.recepient_image
              : route?.params?.item?.sender_image
          }
          onBackPress={() => navigation.goBack()}
        />
        <FlatList
          inverted
          data={allMessages}
          extraData={allMessages}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <View>
          <FlatList
            horizontal
            extraData={chats}
            data={[{}, ...chats]}
            renderItem={renderQuickChats}
            keyboardShouldPersistTaps={'always'}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <KeyboardAvoidingView
          behavior={platformOrientedCode('height', 'padding')}>
          {route?.params?.item?.is_blocked ? (
            <View style={styles.blockStyle}>
              <Text style={styles.blockText}>Conversation is Blocked</Text>
            </View>
          ) : (
            <View style={styles.inputView}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder={'Write a message...'}
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
                    onPress={() => onSend('typed_message', message)}>
                    <Image
                      source={appIcons.sendbutton}
                      style={styles.sendIconStyle}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default Inbox;
