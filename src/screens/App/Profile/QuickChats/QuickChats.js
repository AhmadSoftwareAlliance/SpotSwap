import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  Spacer,
  AppHeader,
  AppLoader,
  NoRecordsField,
} from '../../../../components';
import {appIcons, appImages, WP} from '../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {
  getQuickChatsRequest,
  removeQuickChatRequest,
} from '../../../../redux/actions';

const QuickChats = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [chats, setChats] = useState([]);
  const [rowId, setRowId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getQuickChats();
  }, [isFocus]);

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

  const renderItem = ({item}) => {
    return (
      <View key={item?.id} style={styles.itemContainer}>
        <Text style={styles.quesTxtStyle}>{item?.message}</Text>
      </View>
    );
  };

  const handleDelete = data => {
    setIsLoading(true);
    dispatch(
      removeQuickChatRequest(
        data?.item?.id,
        res => {
          getQuickChats();
        },
        err => {
          setIsLoading(false);
          console.log('Error ==> ', err);
          Alert.alert('Something went wrong!');
        },
      ),
    );
  };

  const handleEdit = data => {
    navigation.navigate('EditQuickChat', {item: data?.item});
  };

  const renderHiddenItem = (data, rowMap) => {
    return data?.item?.id === rowId ? (
      <View style={styles.backBtnsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => {
            rowMap[data?.item?.id].closeRow();
            handleEdit(data);
            setRowId('');
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.editIcon}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            rowMap[data?.item?.id].closeRow();
            handleDelete(data);
            setRowId('');
          }}>
          <Image
            resizeMode="contain"
            source={appIcons.delIcon}
            style={styles.iconStyle}
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
      <AppHeader
        rightIcon
        title="Quick Chat"
        onBackPress={() => navigation.goBack()}
        onRightPress={() => {
          setRowId('');
          navigation.navigate('AddQuickChat', {screen: 'QuickChats', item: {}});
        }}
      />
      <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
      {chats?.length > 0 ? (
        <SwipeListView
          useFlatList
          data={chats}
          useNativeDriver
          extraData={chats}
          renderItem={renderItem}
          leftOpenValue={0}
          rightOpenValue={-115}
          previewOpenValue={0.1}
          previewOpenDelay={100}
          restSpeedThreshold={0.5}
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
        <NoRecordsField loading={isLoading} content="No Quick Chat Found" />
      )}
    </ImageBackground>
  );
};

export default QuickChats;
