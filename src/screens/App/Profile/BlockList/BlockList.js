import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {SwipeListView} from 'react-native-swipe-list-view';
import {WP, colors, appIcons, appImages} from '../../../../shared/exporter';
import {
  Spacer,
  ChatCard,
  AppHeader,
  DeleteModal,
  NoRecordsField,
} from '../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {
  getConversationsRequest,
  blockUnblockChatRequest,
  deleteConversationRequest,
} from '../../../../redux/actions';

const BlockList = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [rowId, setRowId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showDellModal, setShowDellModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getAllConversations(true);
  }, [isFocus]);

  const getAllConversations = loading => {
    setIsLoading(loading);
    dispatch(
      getConversationsRequest(
        res => {
          setIsLoading(false);
          let blockedList = res?.conversations?.filter(
            item => item?.is_blocked,
          );
          setConversations(blockedList);
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
      title={item.sender_name}
      userImage={item.sender_image}
      subTitle={item.sender_last_message_body}
      onPress={() => navigation.navigate('Inbox', {item: item})}
    />
  );

  const handleDelete = () => {
    setIsLoading(true);
    const params = new FormData();
    params.append('conversation_id', id);
    dispatch(
      deleteConversationRequest(
        params,
        res => {
          setIsLoading(false);
          console.log('Res is ==> ', res);
          setConversations(res?.conversations);
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
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => {
            rowMap[data?.item?.id].closeRow();
            setId(data?.item?.sender_id);
            setName(data?.item?.sender_name);
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
            setId(data?.item?.id);
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
      <AppHeader title="Block List" onBackPress={() => navigation.goBack()} />
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
        <NoRecordsField loading={isLoading} content="No Block List Found" />
      )}
      {showAppModal && (
        <DeleteModal
          show={showAppModal}
          title="Unblock Profile"
          subTitle={`Are you sure you want to unblock ${name}?`}
          btnTitle="Yes"
          subBtnTitle="Cancel"
          bgColor={colors.b_gradient}
          onPressHide={() => {
            setShowAppModal(!showAppModal);
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
          title="Permanent Delete Profile"
          subTitle="Are you sure you want to permanently delete Laziz Puth?"
          btnTitle="Yes"
          subBtnTitle="Cancel"
          bgColor={colors.b_gradient}
          onPressHide={() => {
            setShowDellModal(false);
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

export default BlockList;
