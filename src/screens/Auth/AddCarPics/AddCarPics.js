import React, {useState, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  FlatList,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WP, appImages, colors} from '../../../shared/exporter';
import {
  Spacer,
  AppButton,
  AppLoader,
  ImagePickerModal,
  AppHeader,
} from '../../../components';
import styles from './styles';
import axios from 'axios';
import {GetToken} from '../utilities/headers';
// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {createCarProfileRequest} from '../../../redux/actions';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
const AddCarPics = ({navigation, route}) => {

  const paramData=route?.params?.item;
  // console.log("modelID",JSON.stringify(paramData.brand,null,2));
  const [brandImage, setBrandImage] = useState('');
  const [yearModel, setYearModel] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isToken, setIsToken] = useState("");
  const [carImages, setCarImages] = useState([{img:""}]);
  // console.log("carImages",brandImage);
  const [showImgPicker, setShowImgPicker] = useState(false);
  const isFocused = useIsFocused()

  // redux stuff
  const dispatch = useDispatch(null);
  const {userInfo} = useSelector(state => state?.auth);

// 
// useFocusEffect(
//   React.useCallback(() => {
    
//   }, [])
// );


  // useLayoutEffect(() => {
    
  //   let values = route?.params?.item;
  //   // console.log("values>>",JSON.stringify(values,null,2));
  //   const originalLink=values?.brand?.selectedItem?.image
  //   const baseUrl = originalLink.split('?')[0];
  //   // console.log("baseUrl",baseUrl);
  //   // setBrandImage(values?.brand?.selectedItem?.image);
  //   // setBrandImage(baseUrl);
   
    
  // }, [route]);
  useEffect(()=>{
    if(isFocused){
      handleget()
      getYear()
      console.log("useEffect called");
      
    }

  },[])
  const getYear=async()=>{
    const Year= await AsyncStorage.getItem('year')
    setYearModel(Year)
    console.log("Year>>",Year);
  }

  const handleget = async () => {
   
    let values = route?.params?.item;
    console.log("values?.model?.selectedItem?.id",values?.color);
    setIsLoading(true)
    const body = {
      id: values?.brandId,
    };
  
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log("token",token);
      const res = await axios.post(
        `https://admin.spotswap.app/api/v1/authentication/get_car_profile`, // Update the URL accordingly
        body, // Pass the body data as the second argument
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("response>>>>>", res.data.image);
      if(res.data.image!=null){
        const originalLink=res.data.image
        const baseUrl = originalLink.split('?')[0];
        setBrandImage(baseUrl);
      }else{
        let values = route?.params?.item;
        const originalLink1=values?.brand?.selectedItem?.image
        const baseUrl1 = originalLink1.split('?')[0];
         setBrandImage(baseUrl1);
      }
     
     
      setIsLoading(false)
      // Handle the response here, e.g., check for success or error
    } catch (error) {
      console.log("err>>>>>>",error);
      setIsLoading(false)
      // Handle any errors that might occur during the request
    }
  };
  const GetToken = async () => {
  
    // setIsToken(token)
    // console.log("token",token);
  };
  const handleSubmit = () => {
    let values = route?.params?.item;
    setIsLoading(true);
    const params = new FormData();
    params.append('user_id', userInfo?.id);
    params.append('car_brand_id', values?.brand?.selectedItem?.id);
    params.append('car_model_id', values?.brandId);
    params.append('length', 0);
    params.append('width', 0);
    params.append('height', 0);
    params.append('color', values?.color);
    params.append('plate_number', values?.plateNumber || '');
    carImages?.forEach(item => {
      console.log("fom item>>>",JSON.stringify(item,null,2));
      if (item?.img) {
        params.append('photos[]', {
          uri: Platform.OS === 'ios' ? item?.img?.uri : item?.img?.uri,
          name: item?.img?.name || 'image',
          type: item?.img?.type,
        });
      }
    });
  //  console.log("formdara",JSON.stringify(params,null,2));
    dispatch(
      createCarProfileRequest(
        params,
        res => {
          
          setIsLoading(false);
          // console.log("res>>>>",JSON.stringify(res,null,2));
          Alert.alert('Created', 'Car profile created successfully.', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Welcome');
              },
            },
          ]);
        },
        err => {
          setIsLoading(false);
          Alert.alert('Car Information', err?.split(', ').join('\n'), [
            {
              text: 'OK',
            },
          ]);
        },
      ),
    );
  };

  //Gallery Handlers
  const openGallery = () => {
    setShowImgPicker(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        // console.log("from galaey",JSON.stringify(image,null,2));
        const data={
          uri:image?.path,
          name:image?.filename || 'image',
           type: image?.mime,
        }
        setCarImages([...carImages, {img: data}]);
      });
    }, 400);
  };

  //Camera Handlers
  const openCamera = () => {
    setShowImgPicker(false);
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then(image => {
      
        const data={
          uri:image?.path,
          name:image?.filename || 'image',
           type: image?.mime,
        }
        console.log("data",data);
       setCarImages([...carImages, {img: data}]);
      });
    }, 400);
  };
  // uri: Platform.OS === 'ios' ? item?.img?.sourceURL : item?.img?.path,
  // name: item?.img?.filename || 'image',
  // type: item?.img?.mime,
  const renderItem = ({item, index}) => {
    // console.log("item",item);
    return (
      <>
        {item?.img === '' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowImgPicker(true)}
            style={styles.pickImgViewStyle}>
            <Icon
              name={'add'}
              type={'materialIcons'}
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <Image source={{uri: item?.img?.uri}} style={styles.itemImgStyle} />
        )}
        {index % 2 === 0 ? <View style={styles.spaceView} /> : null}
      </>
    );
  };

  const keyExtractor = item => item?.id;

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <Spacer androidVal={WP('14')} iOSVal={WP('14')} />
        <Text style={styles.passTxtStyle}>Tell us about{'\n'}your car</Text>
        <Spacer androidVal={WP('8')} iOSVal={WP('8')} />
        <Text style={styles.nameTxtStyle}>
          {/* Toyota Avanza 55LG (Default Image) */}
          {paramData?.brand?.selectedItem?.name} {paramData?.model?.selectedItem?.name} {yearModel} (Default Image)
        </Text>
        <Image
          // source={brandImage ? {uri: brandImage} : appImages.car}
          source={ brandImage ? {uri: brandImage} : {uri: brandImage}}
          style={styles.imgStyle}
          // resizeMode="cover"
          
        />
        <Text style={styles.uploadTxtStyle}>Upload Photos (Optional)</Text>
        <FlatList
          data={carImages}
          numColumns={2}
          extraData={carImages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
        <Spacer androidVal={WP('17')} iOSVal={WP('17')} />
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <AppButton title="Submit" onPress={() => handleSubmit()} />
      </View>
      {showImgPicker && (
        <ImagePickerModal
          show={showImgPicker}
          onPressGallery={() => {
            openGallery();
          }}
          onPressCamera={() => {
            openCamera();
          }}
          onPressHide={() => setShowImgPicker(false)}
        />
      )}
    </ImageBackground>
  );
};

export default AddCarPics;
