import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {DYNAMIC_LINK} from '@env';
import {useIsFocused} from '@react-navigation/core';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {
  appIcons,
  appLogos,
  appImages,
  cardMethods,
} from '../../../../../shared/exporter';
import {AppHeader, AppLoader} from '../../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {getLinkRequest} from '../../../../../redux/actions';

const AddPaymentMethod = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    console.log("useEffect called");
    getAppLaunchLink();
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  
  }, [isFocus]);


  
  const getAppLaunchLink = () => {
    console.log("getAppLaunchLink called");
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log("link",link?.url);
        if (link?.url === DYNAMIC_LINK) {
          console.log('LINK ==> ', link);
        }
      });
  };

  const handleDynamicLink = link => {
    try {
      if (link?.url === DYNAMIC_LINK) {
        console.log('Dynamic LINK ==> ', link?.url);
      }
    } catch (error) {
      console.log("error >>>",error);
    }
  };

  const getConnectedURL = () => {
    setIsLoading(true);
    dispatch(
      getLinkRequest(
        res => {
          console.log("res?.account_details?.link",res?.account_details?.link);
          setIsLoading(false);
          Linking.openURL(res?.account_details?.link);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedId(item?.id);
          if (item?.title === 'Wallet') {
            getConnectedURL();
          } else {
            navigation.navigate(item?.route);
          }
        }}
        activeOpacity={0.7}>
        <Image
          source={
            selectedId === item?.id ? appIcons.checkIcon : appIcons.unCheckIcon
          }
          style={styles.iconStyle}
        />
        <Text style={styles.titleStyle}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader
        title="Add Payment Method"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.rowContainer}>
        <Image source={appLogos.cardLogo} style={styles.cardStyle} />
        <Image
          source={appLogos.masterCardLogo}
          style={styles.masterCardStyle}
        />
        <Image source={appLogos.visaLogo} style={styles.visaCardStyle} />
      </View>
      <Text style={styles.textStyle}>Select Payment Method</Text>
      <FlatList
        data={cardMethods}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </ImageBackground>
  );
};

export default AddPaymentMethod;
