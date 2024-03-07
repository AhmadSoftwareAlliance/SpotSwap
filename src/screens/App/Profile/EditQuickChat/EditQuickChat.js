import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, ImageBackground} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  appImages,
  quickChatVS,
  quickChatFormFields,
} from '../../../../shared/exporter';
import {
  Spacer,
  AppInput,
  AppModal,
  AppButton,
  AppHeader,
  AppLoader,
} from '../../../../components';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {editQuickChatRequest} from '../../../../redux/actions';

const EditQuickChat = ({navigation, route}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  const handleEditQuickChat = values => {
    const {item} = route?.params;
    setIsLoading(true);
    const params = new FormData();
    params.append('id', item?.id);
    params.append('message', values?.chat);
    dispatch(
      editQuickChatRequest(
        params,
        res => {
          setIsLoading(false);
          setTimeout(() => {
            setShowAppModal(true);
            formikRef.current?.resetForm();
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
        title="Edit Quick Chat"
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        innerRef={formikRef}
        initialValues={quickChatFormFields}
        onSubmit={values => {
          handleEditQuickChat(values);
        }}
        validationSchema={quickChatVS}>
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
            setFieldValue('chat', item?.message);
          }, [route]);
          return (
            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollViewStyle}
              showsVerticalScrollIndicator={false}>
              <Spacer androidVal={WP('11')} iOSVal={WP('11')} />
              <AppInput
                renderErrorMessage
                disableFullscreenUI
                value={values.chat}
                blurOnSubmit={false}
                touched={touched.chat}
                title="Enter your quick chat"
                errorMessage={errors.chat}
                placeholder="Enter quick chat"
                placeholderTextColor={colors.g2}
                onChangeText={handleChange('chat')}
                onBlur={() => setFieldTouched('chat')}
              />
              <Spacer androidVal={WP('3')} iOSVal={WP('3')} />
              <View style={styles.bottomView}>
                <AppButton title="Save" onPress={() => handleSubmit()} />
              </View>
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
      {showAppModal && (
        <AppModal
          show={showAppModal}
          title={'Quick Chat\nSuccessfully Updated'}
          onPressHide={() => {
            setShowAppModal(false);
            navigation.navigate('QuickChats');
          }}
        />
      )}
    </ImageBackground>
  );
};

export default EditQuickChat;
