import React, {useRef, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {CardField, createToken} from '@stripe/stripe-react-native';
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
  AppButton,
  AppHeader,
  AppLoader,
} from '../../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {addCardRequest} from '../../../../../redux/actions';

const AddCardDetails = ({navigation}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [cardInfoError, setCardInfoError] = useState('');

  // redux stuff
  const dispatch = useDispatch(null);

  const onAdd = async values => {
    setIsLoading(true);
    const data = await createToken({
      name: values?.name,
      type: 'Card',
      setupFutureUsage: 'OffSession',
    });
    if (data?.token?.id) {
      var params = new FormData();
      params.append('name', values?.name);
      params.append('token', data?.token?.id);
      params.append('address', values?.address);
      params.append('country', values?.country);
      params.append('payment_type', 'credit_card');
      const onSuccess = res => {
        setIsLoading(false);
        formikRef.current?.resetForm();
        setTimeout(()=>{
          navigation.replace('CardAddSuccessfully');
        },500)
      
      };
      const onFailure = res => {
        setIsLoading(false);
        console.log('On Add Card Failure', res);
      };
      dispatch(addCardRequest(params, onSuccess, onFailure));
    } else {
      setIsLoading(false);
      setCardInfoError('Card Information Required');
    }
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader
        title="Add Card Details"
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        innerRef={formikRef}
        initialValues={cardFormField}
        onSubmit={values => {
          onAdd(values);
        }}
        validationSchema={cardDetailsVs}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewStyle}
            showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
              <Text style={styles.labelTxtStyle}>Card Details</Text>
              <CardField
                placeholder={{
                  number: 'Card Number',
                }}
                postalCodeEnabled={false}
                cardStyle={styles.cardStyle}
                style={styles.payStyle}
              />
              {cardInfoError ? (
                <Text style={styles.errorTxtStyle}>{cardInfoError}</Text>
              ) : (
                <Text style={styles.errorTxtStyle} />
              )}
              <Spacer androidVal={WP('6')} iOSVal={WP('6')} />
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
              <Spacer androidVal={WP('5')} iOSVal={WP('5')} />
            </View>
            <View style={styles.bottomView}>
              <AppButton
                title="Add Card"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default AddCardDetails;
