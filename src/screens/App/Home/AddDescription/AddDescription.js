import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  descVs,
  appImages,
  descFormField,
  topUpField
} from '../../../../shared/exporter';
import {Spacer, AppButton, AppHeader, AppLoader, AppInput} from '../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {createSpotReq} from '../../../../redux/actions';

const AddDescription = ({navigation, route}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  let {carImage, latitude, longitude, address} = route?.params?.item;
  // redux stuff
  // console.log("carImage on discription",carImage);
  const dispatch = useDispatch(null);

  const handleSaveInfo = values => {
    setIsLoading(true);
    let {carImage, latitude, longitude, address} = route?.params?.item;

    const params = new FormData();
    params.append('latitude', latitude);
    params.append('longitude', longitude);
    params.append('address', address || 'Address is not found');
    params.append('description', values?.discription);
    // params.append('amount', values?.amount);
    if (carImage) {
      params.append('image', {
        uri: Platform.OS === 'ios' ? carImage?.path : carImage?.path,
        name: carImage?.filename || 'image',
        type: carImage?.mime,
      });
    }
    console.log("form data",JSON.stringify(params,null,2));
    dispatch(
      createSpotReq(
        params,
        res => {
          setIsLoading(false);
          formikRef.current?.resetForm();
          setTimeout(()=>{
            navigation.replace('ActivateSpot', {
              activated: false,
              slot: res?.parking_slot,
            });
          },1000)
         
        },
        err => {
          setIsLoading(false);
          console.log('Error ==>1111 ', err);
          if (
            err ===
            'You have not any Account Setup for Payment , Please Add it first.'||
            err ===
            'Your Stripe Connect Account data is missing or invalid, Please provide valid data.' ||
          err ===
            'Your Account status is Pending. Please wait, it may take a few minutes.' ||
          err === 'Please Complete your Account Details.'
          ) {
            Alert.alert('Failure', err, [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('Profile', {screen: 'AddPaymentMethod'}),
              },
            ]);
          } else {
            alert(err);
          }
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
      <Formik
        innerRef={formikRef}
        initialValues={descFormField}
        onSubmit={values => {
          handleSaveInfo(values);
        }}
        validationSchema={descVs}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewStyle}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>Add Description</Text>
              {/* <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <AppInput
                placeholder="Enter Amount"
                title="Enter Amount"
                phTextColor={colors.white}
                touched={touched.amount}
                errorMessage={errors.amount}
                renderErrorMessage
                onBlur={() => setFieldTouched('amount')}
                value={values.amount}
                onChangeText={handleChange('amount')}
              /> */}
               <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <Text style={styles.msgText}>Optional</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Type here..."
                  placeholderTextColor={colors.w1}
                  multiline={true}
                  onBlur={handleBlur('discription')}
                  value={values.discription}
                  onChangeText={handleChange('discription')}
                />
              </View>
              {errors.discription && touched.discription ? (
                <Text style={styles.errorText}>{errors.discription}</Text>
              ) : null}
              <Spacer androidVal={WP('25')} iOSVal={WP('25')} />
              
            </View>
            <View style={styles.bottomView}>
              <AppButton title="Save" onPress={() => handleSubmit()} />
            </View>
            <Text style={styles.skipTextStyle} onPress={() => handleSubmit()}>
              Skip
            </Text>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default AddDescription;
