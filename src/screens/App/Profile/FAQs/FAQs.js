import React, {useState, useEffect} from 'react';
import {Text, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import {
  Spacer,
  AppHeader,
  AppLoader,
  NoRecordsField,
} from '../../../../components';
import {appImages, WP} from '../../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {getFaqsRequest} from '../../../../redux/actions';

const FAQs = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(null);

  useEffect(() => {
    getFAQs();
  }, []);

  const getFAQs = () => {
    setIsLoading(true);
    dispatch(
      getFaqsRequest(
        res => {
          if (res?.faqs?.length > 0) {
            let arr = res?.faqs?.map(item => {
              return {
                ...item,
                isSelected: false,
              };
            });
            setData(arr);
          }
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const handleSelection = ({id}) => {
    let dataArr = data?.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return {
        ...item,
        isSelected: false,
      };
    });
    setData(dataArr);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item?.id}
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => handleSelection(item)}>
        <Text style={styles.quesTxtStyle}>{item?.question}</Text>
        {item.isSelected && (
          <Text style={styles.ansTxtStyle}>{item?.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const keyExtractor = item => item?.id;

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader title="FAQs" onBackPress={() => navigation.goBack()} />
      <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
      {data?.length > 0 ? (
        <FlatList
          data={data}
          extraData={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NoRecordsField loading={isLoading} content="No FAQs Found" />
      )}
    </ImageBackground>
  );
};

export default FAQs;
