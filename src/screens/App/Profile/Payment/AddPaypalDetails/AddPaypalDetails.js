import React, {useRef, useState} from 'react';
import {View, SafeAreaView, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {WebView} from 'react-native-webview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  payPalDetailVs,
  payPalDetailFormField,
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
import {
  addPayPalAccountReq,
  savePayPalAccountReq,
} from '../../../../../redux/actions';

const AddPaypalDetails = ({navigation}) => {
  const formikRef = useRef();
  const [email, setEmail] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const onConnect = values => {
    setIsLoading(true);
    var params = new FormData();
    params.append('email', values?.email);
    const onSuccess = res => {
      setIsLoading(false);
      setEmail(res?.email);
      setWebUrl(res?.response?.links);
      formikRef.current?.resetForm();
    };
    const onFailure = res => {
      setIsLoading(false);
      console.log('Error', res);
    };
    dispatch(addPayPalAccountReq(params, onSuccess, onFailure));
  };

  const _onNavigationStateChange = webViewState => {
    if (webViewState?.url.includes('merchantIdInPayPal')) {
      setWebUrl('');
      savePayPalAccount();
    }
  };

  const savePayPalAccount = () => {
    setIsLoading(true);
    var params = new FormData();
    params.append('email', email);
    params.append('link', webUrl[0]?.href);
    const onSuccess = res => {
      setIsLoading(false);
      formikRef.current?.resetForm();
      navigation.navigate('PaypalAddedSuccessfully');
    };
    const onFailure = err => {
      setIsLoading(false);
      alert(err);
      console.log('Error', err);
    };
    dispatch(savePayPalAccountReq(params, onSuccess, onFailure));
  };

  return webUrl ? (
    <SafeAreaView style={styles.webViewContainer}>
      <View style={styles.headerContainer}>
        <AppHeader
          title="Add Paypal Details"
          onBackPress={() => setWebUrl('')}
        />
      </View>
      <WebView
        style={styles.webViewStyle}
        source={{uri: webUrl[1]?.href}}
        onNavigationStateChange={webViewState =>
          _onNavigationStateChange(webViewState)
        }
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <AppLoader loading={isLoading} />}
      />
    </SafeAreaView>
  ) : (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader
        title="Add Paypal Details"
        onBackPress={() => navigation.goBack()}
      />
      <Spacer androidVal={WP('7')} iOSVal={WP('7')} />
      <Formik
        innerRef={formikRef}
        initialValues={payPalDetailFormField}
        onSubmit={values => {
          onConnect(values);
        }}
        validationSchema={payPalDetailVs}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewStyle}>
            <AppInput
              title="Enter Email"
              placeholder="Enter PayPal Account Email"
              phTextColor={colors.white}
              touched={touched.email}
              errorMessage={errors.email}
              renderErrorMessage
              onBlur={() => setFieldTouched('email')}
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <View style={styles.bottomView}>
              <AppButton title="Connect" onPress={() => handleSubmit()} />
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default AddPaypalDetails;
