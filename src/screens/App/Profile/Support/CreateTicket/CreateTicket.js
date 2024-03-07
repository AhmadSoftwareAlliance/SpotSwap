import React, {useRef, useState} from 'react';
import {View, Alert, ImageBackground, Text, TextInput} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  WP,
  colors,
  ticketVs,
  appImages,
  ticketFormField,
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
import {useDispatch, useSelector} from 'react-redux';
import {createSupportTicketRequest} from '../../../../../redux/actions';

const CreateTicket = ({navigation}) => {
  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);
  const {userInfo} = useSelector(state => state.auth);

  const handleCreateTicket = values => {
    setIsLoading(true);
    const params = new FormData();
    params.append('user_id', userInfo?.id);
    params.append('status', 'pending');
    params.append('description', values?.discription);
    dispatch(
      createSupportTicketRequest(
        params,
        res => {
          setIsLoading(false);
          formikRef.current?.resetForm();
          navigation.navigate('SentSuccess');
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
        title="Create Ticket"
        onBackPress={() => navigation.goBack()}
      />
      <Spacer androidVal={WP('9')} iOSVal={WP('9')} />
      <Formik
        innerRef={formikRef}
        initialValues={ticketFormField}
        onSubmit={values => {
          handleCreateTicket(values);
        }}
        validationSchema={ticketVs}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewStyle}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>
                We’d love to help you{'\n'}with your concern.
              </Text>
              <Text style={styles.msgText}>Message</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Type here..."
                  placeholderTextColor={colors.w1}
                  maxLength={600}
                  multiline={true}
                  onBlur={handleBlur('discription')}
                  value={values.discription}
                  onChangeText={handleChange('discription')}
                />
                <Text style={styles.countText}>
                  {values.discription.length}/600
                </Text>
              </View>
              {errors.discription && touched.discription ? (
                <Text style={styles.errorText}>{errors.discription}</Text>
              ) : null}
              <Spacer androidVal={WP('25')} iOSVal={WP('25')} />
            </View>
            <View style={styles.bottomView}>
              <AppButton
                title="Submit"
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

export default CreateTicket;
