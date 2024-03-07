import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  Spacer,
  ChatCard,
  AppLoader,
  HomeHeader,
  DeleteModal,
  NoRecordsField,
} from '../../../../components';
import {WP, colors, appIcons, appImages} from '../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {
  getConversationsRequest,
  blockUnblockChatRequest,
  deleteConversationRequest,
} from '../../../../redux/actions';

const Chat = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [rowId, setRowId] = useState('');
  const [convoId, setConvoId] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showDellModal, setShowDellModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const {userInfo} = useSelector(state => state.auth);

  useEffect(() => {
    getAllConversations(true);
    return () => {
      setRowId('');
    };
  }, [isFocus]);

  const getAllConversations = loading => {
    setIsLoading(loading);
    dispatch(
      getConversationsRequest(
        res => {
          setIsLoading(false);
          setConversations(res?.conversations);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const renderItem = ({item, index}) => (
    <ChatCard
      title={
        item?.sender_id === userInfo?.id
          ? item.recepient_name
          : item.sender_name
      }
      userImage={
        item?.sender_id === userInfo?.id
          ? item.recepient_image
          : item.sender_image
      }
      subTitle={item.sender_last_message_body}
      onPress={() => navigation.navigate('Inbox', {item: item})}
    />
  );

  const handleDelete = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('conversation_id', convoId);
    dispatch(
      deleteConversationRequest(
        params,
        res => {
          setIsLoading(false);
          getAllConversations(false);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const handleBlockUnblock = () => {
    const params = new FormData();
    params.append('user_id', id);
    dispatch(
      blockUnblockChatRequest(
        params,
        res => {
          alert(res?.message);
          getAllConversations(false);
        },
        err => {
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return data?.item?.id === rowId ? (
      <View style={styles.backBtnsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.backRightBtn,
            styles.backRightBtnLeft(data?.item?.is_blocked),
          ]}
          onPress={() => {
            setIsBlocked(data?.item?.is_blocked);
            rowMap[data?.item?.id].closeRow();
            setId(
              data?.item?.sender_id === userInfo?.id
                ? data?.item?.recepient_id
                : data?.item?.sender_id,
            );
            setConvoId(data?.item?.id);
            setName(
              data?.item?.sender_id === userInfo?.id
                ? data?.item?.recepient_name
                : data?.item?.sender_name,
            );
            setShowAppModal(true);
            setRowId('');
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.chatBlock}
            style={styles.blockIconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            rowMap[data?.item?.id].closeRow();
            setId(
              data?.item?.sender_id === userInfo?.id
                ? data?.item?.recepient_id
                : data?.item?.sender_id,
            );
            setConvoId(data?.item?.id);
            setShowDellModal(true);
            setRowId('');
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.delIcon}
            style={styles.delIconStyle}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <HomeHeader title="Inbox" />
      <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
      {conversations?.length > 0 ? (
        <SwipeListView
          useFlatList
          useNativeDriver
          data={conversations}
          extraData={conversations}
          renderItem={renderItem}
          leftOpenValue={0}
          rightOpenValue={-110}
          previewOpenValue={0.1}
          previewOpenDelay={100}
          restSpeedThreshold={5}
          closeOnScroll
          closeOnRowPress
          onRowOpen={(rowKey, rowMap) => {
            setRowId(rowKey);
            let key = rowKey;
            if (key === rowKey) {
              return;
            }
            setTimeout(() => {
              rowMap[rowKey].closeRow();
            }, 2000);
          }}
          onRowClose={(rowKey, rowMap) => {
            setRowId('');
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item?.id}
          renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
        />
      ) : (
        <NoRecordsField loading={isLoading} content="No Conversation Found" />
      )}
      {showAppModal && (
        <DeleteModal
          show={showAppModal}
          title={isBlocked ? 'Unblock Profile' : 'Block'}
          subTitle={
            isBlocked
              ? `Are you sure you want to unblock ${name}?`
              : 'Are you sure you want to block this conversation'
          }
          btnTitle={isBlocked ? 'Yes' : 'Block'}
          subBtnTitle="Cancel"
          bgColor={isBlocked ? colors.b_gradient : colors.r_gradient}
          onPressHide={() => {
            setShowAppModal(!showAppModal);
            setRowId('');
          }}
          onPress={() => {
            handleBlockUnblock();
            setShowAppModal(false);
          }}
        />
      )}
      {showDellModal && (
        <DeleteModal
          show={showDellModal}
          title="Delete"
          subTitle="Are you sure you want to delete this conversation"
          btnTitle="Delete"
          subBtnTitle="Cancel"
          bgColor={colors.r_gradient}
          onPressHide={() => {
            setShowDellModal(false);
            setRowId('');
          }}
          onPress={() => {
            handleDelete();
            setShowDellModal(false);
          }}
        />
      )}
    </ImageBackground>
  );
};

export default Chat;
