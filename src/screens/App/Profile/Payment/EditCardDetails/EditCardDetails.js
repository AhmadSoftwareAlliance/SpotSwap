import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  cardDetailsVs,
  cardFormField,
} from '../../../../../shared/exporter';
import {
  Spacer,
  AppInput,
  AppModal,
  AppHeader,
  AppButton,
  AppLoader,
} from '../../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {updateCardRequest} from '../../../../../redux/actions';

const EditCardDetails = ({navigation, route}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const onEditCard = values => {
    const {item} = route?.params;
    setIsLoading(true);
    const params = new FormData();
    params.append('id', item?.id);
    params.append('name', values?.name);
    params.append('address', values?.address);
    params.append('country', values?.country);
    dispatch(
      updateCardRequest(
        params,
        res => {
          setIsLoading(false);
          setTimeout(() => {
            setShowAppModal(true);
          }, 1000);
        },
        err => {
          setIsLoading(false);
          console.log('Error ==> ', err);
          Alert.alert('Something went wrong!');
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader
        title="Edit Card Details"
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        innerRef={formikRef}
        initialValues={cardFormField}
        onSubmit={values => {
          onEditCard(values);
        }}
        validationSchema={cardDetailsVs}>
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
            const {item} = route?.params;
            setFieldValue('name', item?.name);
            setFieldValue('address', item?.address);
            setFieldValue('country', item?.country);
          }, [route]);
          return (
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewStyle}>
              <View style={styles.contentContainer}>
                <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
                <AppInput
                  placeholder="Enter Name"
                  title="Name on card"
                  phTextColor={colors.white}
                  touched={touched.name}
                  errorMessage={errors.name}
                  renderErrorMessage
                  onBlur={() => setFieldTouched('name')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
                <AppInput
                  placeholder="Enter Address"
                  title="Address"
                  phTextColor={colors.white}
                  touched={touched.address}
                  errorMessage={errors.address}
                  renderErrorMessage
                  onBlur={() => setFieldTouched('address')}
                  value={values.address}
                  onChangeText={handleChange('address')}
                />
                <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
                <AppInput
                  placeholder="Enter Country"
                  title="Country"
                  phTextColor={colors.white}
                  touched={touched.country}
                  errorMessage={errors.country}
                  renderErrorMessage
                  onBlur={() => setFieldTouched('country')}
                  value={values.country}
                  onChangeText={handleChange('country')}
                />
                <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              </View>
              {showAppModal && (
                <AppModal
                  show={showAppModal}
                  title={'Card Details Updated Successfully'}
                  onPressHide={() => {
                    setShowAppModal(false);
                    formikRef.current?.resetForm();
                    navigation.navigate('Payment');
                  }}
                />
              )}
              <View style={styles.bottomView}>
                <AppButton
                  title="Save Changes"
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </ImageBackground>
  );
};

export default EditCardDetails;
