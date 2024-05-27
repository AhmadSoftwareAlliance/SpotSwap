import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  updateCarInfoVS,
  updateCarInfoFormFields,
  appIcons,
  carInfoVS,
} from '../../../../shared/exporter';
import {
  Spacer,
  AppModal,
  AppInput,
  AppButton,
  AppLoader,
  AppHeader,
  DropdownPicker,
  ImagePickerModal,
} from '../../../../components';
import styles from './styles';

// redux stuff
import { useSelector, useDispatch } from 'react-redux';
import {
  createCarProfileRequest,
  getCarInfoRequest,
  getCarSpecsRequest,
  getProfileRequest,
  updateCarInfoRequest,
} from '../../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';
const colordata = [
  { id: 1, name: "White" },
  { id: 1, name: "Black" },
  { id: 2, name: "Blue" },
  { id: 3, name: "Red" },
  { id: 3, name: "Silver" },
  { id: 3, name: "Grey" },
]
const modaldata = [
  { id: 1, name: "1995" },
  { id: 2, name: "1996" },
  { id: 3, name: "1997" },
  { id: 4, name: "1998" },
  { id: 5, name: "1999" },
  { id: 6, name: "2000" },
  { id: 7, name: "2001" },
  { id: 8, name: "2002" },
  { id: 9, name: "2003" },
  { id: 10, name: "2004" },
  { id: 11, name: "2005" },
  { id: 12, name: "2006" },
  { id: 13, name: "2007" },
  { id: 14, name: "2008" },
  { id: 15, name: "2009" },
  { id: 16, name: "2010" },
  { id: 17, name: "2011" },
  { id: 18, name: "2012" },
  { id: 19, name: "2013" },
  { id: 20, name: "2014" },
  { id: 21, name: "2015" },
  { id: 22, name: "2016" },
  { id: 23, name: "2017" },
  { id: 24, name: "2018" },
  { id: 25, name: "2019" },
  { id: 26, name: "2020" },
  { id: 27, name: "2021" },
  { id: 28, name: "2022" },
  { id: 29, name: "2023" },
]
const UpdateCarInfo = ({ navigation }) => {
  const formikRef = useRef();
  const [carBrands, setCarBrands] = useState([]);
  // console.log("carBrands",JSON.stringify(carBrands,null,2));
  const [carModels, setCarModels] = useState([]);
  const [carBrandId, setCarBrandId] = useState('');
  const [carModelId, setCarModelId] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  console.log("isChecked",isChecked);
  const [isLoading, setIsLoading] = useState(false);
  const [carImages, setCarImages] = useState([{ img: '' }]);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showImgPicker, setShowImgPicker] = useState(false);
  const [openBrandPicker, setOpenBrandPicker] = useState(false);
  const [openModelPicker, setOpenModelPicker] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const { userInfo } = useSelector(state => state.auth);
  const { carInfo, userProfile } = useSelector(state => state.profile);
  console.log("carInfo>>>>>>",JSON.stringify(carInfo,null,2));
  useEffect(() => {
    // const car_models = []
    // carInfo?.user_car_models?.forEach(ite => {
    //   const i = car_models.findIndex(it => it?.name == ite?.name)
    //   // console.log("car_models",JSON.stringify(i,null,2));
    //   if (i > -1) {
    //     car_models[i].released_years.push({ ...ite })
    //   } else {
    //     car_models.push({ ...ite, released_years: [{ ...ite }] })
    //   }
    // })
    // console.log("car_models",JSON.stringify(car_models,null,2));
    // setCarModels(car_models)
  }, [carInfo])

  useEffect(() => {
    getCarSpecs();


    let prevImgs = carInfo?.photos?.map(item => {
      return {
        img: { url: item?.url, name: '', type: '' },
      }
    }) || []
    setCarImages([...carImages, ...prevImgs]);
    console.log("carInfo?.is_show",carInfo?.is_show);
    userProfile?.profile_complete?
    setIsChecked(carInfo?.is_show):setIsChecked(true)
  }, []);

  const getCarSpecs = () => {
    setIsLoading(true);
    dispatch(
      getCarSpecsRequest(
        res => {
          // console.log("get car space request",JSON.stringify(res,null,2));
          setIsLoading(false);
          let newArry = res?.car_brand.sort((a, b) => a.name.localeCompare(b.name));
          newArry = newArry?.map(item => {
            const car_models = []
            item?.car_models?.forEach(ite => {
              const i = car_models.findIndex(it => it?.name == ite?.name)
              if (i > -1) {
                car_models[i].released_years.push({ ...ite })
              } else {
                car_models.push({ ...ite, released_years: [{ ...ite }] })
              }
            })
            return { ...item, car_models }
          })
          // console.log("arr>>>", JSON.stringify(newArry, null, 2));
          setCarBrands(newArry);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  const handleUpdateInfo = values => {
    console.log("handleUpdateInfo", JSON.stringify(values,null,2));
    setIsLoading(true);
    const params = new FormData();
    params.append('id', carInfo?.id || userInfo?.user_car_profile_id ||carInfo?.car_detail_id);
    params.append(
      'car_brand_id',
       carBrandId || values?.brand?.selectedItem?.id,
    );
    params.append(
      'car_model_id', values?.brandId || carModelId || values?.model?.selectedItem?.id,
    );
    params.append('length', values?.length);
    params.append('width', values?.width);
    params.append('height', values?.height);
    params.append('color', values?.color);
    params.append('plate_number', values?.plateNumber || '');
    params.append('is_show', isChecked);
    carImages?.forEach(item => {
      if (item?.img?.type) {
        params.append('photos[]', {
          uri: item?.img?.url,
          name: item?.img?.name,
          type: item?.img?.type,
        });
      }
    });
    dispatch(
      updateCarInfoRequest(
        params,
        res => {
          // console.log("res on updata api>>>>>", JSON.stringify(res.profile, null, 2));
          setIsLoading(false);
          setTimeout(() => {
            setShowAppModal(true);
          }, 1000);
        },
        err => {
          // console.log("res2222>>>>>",err);
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
  const getUserProfile = () => {
    // setIsLoading(true);
    dispatch(
      getProfileRequest(
        res => {
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>2 ', err);
        },
      ),
    );
  };

  const handleSubmit = (values) => {
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
      if (item?.img?.type) {
        params.append('photos[]', {
          uri: item?.img?.url,
          name: item?.img?.name,
          type: item?.img?.type,
        });
      }
    });
    dispatch(
      createCarProfileRequest(
        params,
        res => {

          console.log("res>>> on submint",JSON.stringify(res,null,2));
          setIsLoading(false)
          getUserProfile()
          getCarProfile(res?.profile.car_detail_id)
          setTimeout(() => {
            setShowAppModal(true);
          }, 1000);
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
  const getCarProfile = async (id) => {
    // setIsLoading(true);
    const params = new FormData();
    params.append('id', id);
    // params.append('id', 123);
    dispatch(
      await getCarInfoRequest(
        params,
        res => {
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==>3 ', err);
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
        mediaType: 'photo',
      }).then(image => {
        setCarImages([
          ...carImages,
          {
            img: {
              type: image?.mime,
              name: image?.filename || 'image',
              url: image?.path || image?.sourceURL,
            },
          },
        ]);
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
        setCarImages([
          ...carImages,
          {
            img: {
              type: image?.mime,
              name: image?.filename || 'image',
              url: image?.path || image?.sourceURL,
            },
          },
        ]);
      });
    }, 400);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
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
          <Image
            source={item?.img?.url ? { uri: item?.img?.url } : appImages.car}
            style={styles.itemImgStyle(index)}
          />
        )}
      </View>
    );
  };

  const keyExtractor = item => item?.id;

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader
        title="Car Information"
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        innerRef={formikRef}
        initialValues={updateCarInfoFormFields}
        onSubmit={values => {
          userProfile?.profile_complete ? handleUpdateInfo(values) : handleSubmit(values)
        }}
        validationSchema={userProfile?.profile_complete?updateCarInfoVS:carInfoVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => {
          useEffect(async () => {
           if(userProfile?.profile_complete){
            const Year = await AsyncStorage.getItem('year')
            console.log("Year>>",Year);
           // setCarBrandId(carInfo?.car_brand_id?carInfo?.car_brand_id:carInfo?.user_car_brand?.car_brand_id);
           setCarBrandId(carInfo?.user_car_brands[0]?.id ? carInfo?.user_car_brands[0]?.id : carInfo?.car_brand_id);
           // setCarModelId(carInfo?.car_model_id?carInfo?.car_model_id:carInfo?.user_car_model?.car_model_id);
           setCarModelId(carInfo?.user_car_models[0]?.Id ? carInfo?.user_car_models[0]?.Id : carInfo?.car_model_id);
           // setCarModels(carInfo?.user_car_models ? carInfo?.user_car_models : carInfo?.car_models);
           // setFieldValue('brand', carInfo?.car_brand?carInfo?.car_brand:carInfo?.car_brand);
           setFieldValue('brand', carInfo?.user_car_brands[0]?.title ? carInfo?.user_car_brands[0]?.title : carInfo?.car_brand);
           // setFieldValue('model', carInfo?.car_model?carInfo?.car_model:carInfo?.car_model);
           setFieldValue('model', carInfo?.user_car_models[0]?.title ? carInfo?.user_car_models[0]?.title : carInfo?.car_model);
           // setFieldValue('length', carInfo?.car_length?.toString()?carInfo?.car_length?.toString():carInfo?.length?.toString());
           setFieldValue('length', carInfo?.length?.toString() ? carInfo?.length?.toString() : carInfo?.car_length?.toString());
           // setFieldValue('width', carInfo?.car_width?.toString()?carInfo?.car_width?.toString():carInfo?.width?.toString());
           setFieldValue('width', carInfo?.width?.toString() ? carInfo?.width?.toString() : carInfo?.car_width?.toString());
           // setFieldValue('height', carInfo?.car_height?.toString()?carInfo?.car_height?.toString():carInfo?.height?.toString());
           setFieldValue('height', carInfo?.height?.toString() ? carInfo?.height?.toString() : carInfo?.car_height?.toString());
           // setFieldValue('color', carInfo?.car_color?carInfo?.car_color:carInfo?.color);
           setFieldValue('color', carInfo?.color ? carInfo?.color : carInfo?.car_color);
           setFieldValue('plateNumber', carInfo?.plate_number || '');
           
           setFieldValue('year', Year)
           }
            
          }, []);
          return (
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewStyle}>
              <Spacer androidVal={WP('8')} iOSVal={WP('8')} />
              <DropdownPicker
                data={carBrands}
                onSelect={(selectedItem, index) => {
                  setFieldValue('brand', { selectedItem });
                  // if (selectedItem?.id !== carInfo?.car_brand_id) {
                  if (selectedItem?.id !== carInfo?.car_brand?.id) {
                    // setCarModelId('');
                    
                    setFieldValue('length', '');
                    setFieldValue('width', '');
                    setFieldValue('height', '');
                    // setFieldValue('color', '');
                  }
                  setCarModels(selectedItem?.car_models);
                  setCarBrandId(selectedItem?.id);
                }}
                touched={touched.brand}
                errorMessage={errors.brand}
                title={'Made / Brand'}
               
                isPickerOpen={openBrandPicker}
                onFocus={() => setOpenBrandPicker(true)}
                onBlur={() => setOpenBrandPicker(false)}
                defaultButtonText={carInfo?.user_car_brands[0]?.title ? carInfo?.user_car_brands[0]?.title : carInfo?.car_brand || 'Choose Brand'}
              />
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <DropdownPicker
                data={carModels}
                onSelect={(selectedItem, index) => {
                  setFieldValue('model', { selectedItem });
                  setFieldValue('year', "Select Models")
                  // setCarModelId('');
                  // setFieldValue('length', selectedItem?.length.toString());
                  // setFieldValue('width', selectedItem?.width.toString());
                  // setFieldValue('height', selectedItem?.height.toString());
                  // setFieldValue('color', selectedItem?.color.toString());
                }}
                touched={touched.model}
                errorMessage={errors.model}
                title={'Car Model'}
                
                isPickerOpen={openModelPicker}
                onFocus={() => setOpenModelPicker(true)}
                onBlur={() => setOpenModelPicker(false)}
                defaultButtonText={
                  carModelId
                    ? carInfo?.user_car_models[0]?.title ? carInfo?.user_car_models[0]?.title : carInfo?.car_model || 'Choose Model'
                    : 'Choose Model'
                }
              />
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              
              <DropdownPicker
                data={modaldata}
                onSelect={(selectedItem, index) => {
                  console.log("selectedItem year",selectedItem);
                  AsyncStorage.setItem('year', selectedItem.name)
                  setFieldValue('year', { selectedItem});
                  const year = values?.model?.selectedItem?.released_years?.find(item => item?.released_year == selectedItem?.name) > -1
                    || values?.model?.selectedItem?.released_years[0]
                 
                  if (year) {
                    console.log("yearyearyear",year);
                    setFieldValue('brandId', year?.id)
                    setFieldValue('length', year?.length?.toString());
                    setFieldValue('width', year?.width?.toString());
                    setFieldValue('height', year?.height?.toString());
                    // setFieldValue('color', year?.color?.toString());
                  }
                }}
                title={'Models year'}
                touched={touched.year}
                errorMessage={errors.year}
                isPickerOpen={openModelPicker}
                defaultButtonText={
                  values
                    ? values.year || 'Select Models'
                    : 'Select Models'
                }
                onFocus={() => setOpenModelPicker(true)}
                onBlur={() => setOpenModelPicker(false)}
              />
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              {/* <View style={styles.inputsRow}>
                <AppInput
                  width={WP('28')}
                  renderErrorMessage
                  disableFullscreenUI
                  value={values.length}
                  title="Length (in)"
                  blurOnSubmit={false}
                  touched={touched.length}
                  keyboardType="numeric"
                  placeholder="Length"
                  editable={false}
                  errorMessage={errors.length}
                  placeholderTextColor={colors.g2}
                  onChangeText={handleChange('length')}
                  onBlur={() => setFieldTouched('length')}
                />
                <AppInput
                  width={WP('28')}
                  renderErrorMessage
                  disableFullscreenUI
                  value={values.width}
                  title="Width (in)"
                  blurOnSubmit={false}
                  touched={touched.width}
                  keyboardType="numeric"
                  placeholder="Width"
                  editable={false}
                  errorMessage={errors.width}
                  placeholderTextColor={colors.g2}
                  onChangeText={handleChange('width')}
                  onBlur={() => setFieldTouched('width')}
                />
                <AppInput
                  width={WP('28')}
                  renderErrorMessage
                  disableFullscreenUI
                  value={values.height}
                  title="Height (ratio)"
                  blurOnSubmit={false}
                  touched={touched.height}
                  keyboardType="numeric"
                  placeholder="Height"
                  editable={false}
                  errorMessage={errors.height}
                  placeholderTextColor={colors.g2}
                  onChangeText={handleChange('height')}
                  onBlur={() => setFieldTouched('height')}
                />
              </View> */}
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <DropdownPicker
                data={colordata}
                onSelect={(selectedItem, index) => {
                  setFieldValue('color', selectedItem?.name);
                }}
                title={'Color'}
                touched={touched.color}
                errorMessage={errors.color}
                isPickerOpen={openModelPicker}
                // defaultButtonText="Select Color"
                defaultButtonText={
                  values
                    ? values.color || 'Select Color'
                    : 'Select Color'
                }
                onFocus={() => setOpenModelPicker(true)}
                onBlur={() => setOpenModelPicker(false)}
              />
              {/* <AppInput
                title="Color"
                renderErrorMessage
                disableFullscreenUI
                value={values.color}
                blurOnSubmit={false}
                touched={touched.color}
                placeholder="Enter Color"
                errorMessage={errors.color}
                placeholderTextColor={colors.g2}
                onChangeText={handleChange('color')}
                onBlur={() => setFieldTouched('color')}
              /> */}
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <AppInput
                renderErrorMessage
                disableFullscreenUI
                value={values.plateNumber}
                blurOnSubmit={false}
                touched={touched.plateNumber}
                errorMessage={errors.plateNumber}
                title="Plate Number"
                placeholderTextColor={colors.g2}
                placeholder="Enter Plate Number"
                onChangeText={handleChange('plateNumber')}
                onBlur={() => setFieldTouched('plateNumber')}
              />
              <Spacer androidVal={WP('2.5')} iOSVal={WP('2.5')} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.checkoxRow}
                onPress={() => setIsChecked(!isChecked)}>
                <Image
                  resizeMode="contain"
                  source={isChecked ? appIcons.checked : appIcons.unChecked}
                  style={styles.iconStyle}
                />
                <Text style={styles.showTxtStyle}>Show in profile</Text>
              </TouchableOpacity>
              <Text style={styles.uploadTxtStyle}>Upload Photos</Text>
              <FlatList
                numColumns={2}
                data={carImages}
                extraData={carImages}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
              />
              <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
              <AppButton title="Update" onPress={handleSubmit} />
              <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
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
      {showAppModal && (
        <AppModal
          show={showAppModal}
          title={'Car Info Successfully\nUpdated!'}
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('Settings');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default UpdateCarInfo;
