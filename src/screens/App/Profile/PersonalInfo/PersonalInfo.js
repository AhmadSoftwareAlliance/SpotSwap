import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {View, Alert, ImageBackground, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  personalInfoVS,
  platformOrientedCode,
  personalInfoFormFields,
} from '../../../../shared/exporter';
import {
  Spacer,
  AppInput,
  AppModal,
  AppButton,
  AppHeader,
  AppLoader,
  ImagePickerModal,
} from '../../../../components';
import styles from './styles';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {updateProfileRequest} from '../../../../redux/actions';

const PersonalInfo = ({navigation}) => {
  const formikRef = useRef();
  const [cca2, setcca2] = useState('US');
  const [oldImage, setOldImage] = useState();
  const [country, setcountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [personImage, setPersonImage] = useState('');
  const [countryCode, setCountryCode] = useState('1');
  const [showAppModal, setShowAppModal] = useState(false);
  const [showImgPicker, setShowImgPicker] = useState(false);
  const [showCountryPicker, setshowCountryPicker] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const {userProfile} = useSelector(state => state.profile);
  console.log("userProfile",JSON.stringify(userProfile,null,2));

  useLayoutEffect(() => {
    setCountryCode(userProfile?.country_code);
  }, []);

  useEffect(() => {
    if (userProfile?.image) {
      setOldImage(userProfile?.image);
    }
  }, []);

  const handleUpdateInfo = values => {
    setIsLoading(true);
    const params = new FormData();
    params.append('name', values?.name);
    params.append('email', values?.email);
    params.append('contact', values?.number);
    params.append('country_code', countryCode);
    if (personImage) {
      params.append('image', {
        name: personImage?.filename || 'image',
        uri: personImage?.path,
        type: personImage?.mime,
      });
    }
    dispatch(
      updateProfileRequest(
        params,
        res => {
          setIsLoading(false);
          setTimeout(() => {
            setShowAppModal(true);
          }, 1000);
        },
        err => {
          setIsLoading(false);
          Alert.alert('Update Fail', err?.split(', ').join('\n'), [
            {
              text: 'OK',
            },
          ]);
        },
      ),
    );
  };

  const setCountryValue = val => {
    setCountryCode(val.callingCode[0]);
    setcca2(val.cca2);
    setcountry(val);
    setshowCountryPicker(false);
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
        setOldImage('');
        setPersonImage(image);
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
        setOldImage('');
        setPersonImage(image);
      });
    }, 400);
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader
        title="Personal Information"
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        innerRef={formikRef}
        initialValues={personalInfoFormFields}
        onSubmit={values => {
          handleUpdateInfo(values);
        }}
        validationSchema={personalInfoVS}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => {
          useEffect(() => {
            const {name, email, contact} = userProfile;
            setFieldValue('name', name);
            setFieldValue('email', email);
            setFieldValue('number', contact);
          }, []);
          return (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.contentContainerStyle}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.imageContainer}
                  onPress={() => setShowImgPicker(true)}>
                  <ImageBackground
                    source={
                      oldImage || personImage
                        ? {
                            uri:
                              oldImage ||
                              platformOrientedCode(
                                personImage?.path,
                                personImage?.sourceURL,
                              ),
                          }
                        : appImages.profile
                    }
                    style={styles.imgStyle}
                    blurRadius={personImage || oldImage ? 0 : 4}
                    imageStyle={styles.imgRadiusStyle}>
                    <Icon
                      type={'feather'}
                      name={'edit-3'}
                      size={18}
                      color={colors.white}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
                <AppInput
                  renderErrorMessage
                  disableFullscreenUI
                  value={values.name}
                  blurOnSubmit={false}
                  touched={touched.name}
                  title="Enter your name"
                  errorMessage={errors.name}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.g2}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
                <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
                <AppInput
                  renderErrorMessage
                  disableFullscreenUI
                  value={values.email}
                  blurOnSubmit={false}
                  touched={touched.email}
                  editable={false}
                  title="Enter your email"
                  errorMessage={errors.email}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor={colors.g2}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
                <AppInput
                  leftIcon
                  cca2={cca2}
                  countryInput
                  renderErrorMessage
                  disableFullscreenUI
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  value={values.number}
                  touched={touched.number}
                  keyboardType={'phone-pad'}
                  title={'Enter phone number'}
                  placeholder={'000 0000 000'}
                  errorMessage={errors.number}
                  onChangeText={handleChange('number')}
                  onBlur={() => setFieldTouched('number')}
                  onSelect={val => {
                    setCountryValue(val);
                  }}
                  countryCode={countryCode}
                  country={country}
                  onPressCountryPicker={() => {
                    setshowCountryPicker(true);
                  }}
                  countryPicker={showCountryPicker}
                />
                <Spacer androidVal={WP('9')} iOSVal={WP('9')} />
                <View style={styles.bottomView}>
                  <AppButton title="Update" onPress={() => handleSubmit()} />
                </View>
              </View>
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
          title={'Profile Successfully\nUpdated!'}
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('Settings');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default PersonalInfo;
