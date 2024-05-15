import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import {AppHeader, AppLoader} from '../../../components';
import RenderHtml,{ Renderer }  from 'react-native-render-html';
import {
  size,
  colors,
  family,
  scrWidth,
  appImages,
} from '../../../shared/exporter';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {staticPagesRequest} from '../../../redux/actions';

const PrivacyPolicy = ({navigation}) => {
  // const [policy, setPolicy] = useState(`At SpotSwap.app, we respect your privacy and are committed to protecting your personal information.
  // This Privacy Policy describes how we collect, use, and share your personal information when you use our website and services. By accessing or using SpotSwap.app, you agree to the terms of this Privacy Policy.
  // Information We Collect
  // When you use SpotSwap.app, we may collect the following types of information:
  //  1. Personal Information: We may collect personal information, such as your name, email address, and phone number, when you voluntarily provide it to us. This information is collected during the account creation process or when you contact us for support.
  //  2. Usage Information: We collect information about how you use
  // SpotSwap.app, such as your preferences, actions, and interactions with the platform. This information helps us personalize your experience and improve our services
  //  3. Log Data: Our servers automatically record certain information when you use SpotSwap.app. This may include your IP address, browser type, referring/exit pages, and other device and usage information. We use this data for system administration, analytics, and to ensure the security and integrity of our platform.
  //  4. Cookies and Similar Technologies:
  // SpotSwap.app may use cookies, web beacons, and other similar technologies to collect and store information when you interact with our website or services. These technologies help us personalize your experience, analyze trends, and track your preferred settings.
  // How We Use Your Information
  // We may use the information we collect for various purposes, including:
  //  1. To provide and improve our services: We use your information to personalize your experience, deliver the services you request, and enhance our platform’s functionality
  // 2. To communicate with you: We may use your email address to send you important updates, service information, and marketing communications. You can opt-out of receiving marketing emails by following the instructions provided in those emails.
  //  3. To analyze and improve our services: We may use your information to understand how users interact with SpotSwap.app, identify areas for improvement, and develop new features. This also includes conducting research and analysis to better understand user demographics and behavior.
  // Sharing of Your Information
  // We may share your information in the following circumstances:
  // 1. 1. Service Providers: We may engage trusted third-party service providers to perform functions and provide services on our behalf, such as hosting, data analysis, customer support, and marketing activities.
  // These service providers will have access to your information solely for the purpose of providing their services to us and in accordance with this
  // Privacy Policy.
  // 2. Legal Requirements: We may access, preserve, and disclose your information if required to do so by law or in good faith belief that such action is necessary to comply with applicable laws, regulations, or legal proceedings, protect and defend our rights or property, or respond to an emergency situation.
  //  3. Consent: We may share your information with your consent, such as when you choose to connect your SpotSwap.app account to social media platforms or share content via third-party integrations.
  // Data Security
  // We take reasonable measures to help protect your personal information from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage IS 100% secure, and we cannot guarantee absolute security.
  // Your Rights and Choices
  // You have certain rights and choices regarding your personal information.
  // You can request access, correction, deletion, or portability of your personal data. Furthermore, you may choose to disable cookies or opt-out of targeted advertising. However, please note that certain features or functionalities of SpotSwap.app may require the use of cookies.
  // Data Security
  // We take reasonable measures to help protect your personal information from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
  // Your Rights and Choices
  // You have certain rights and choices regarding your personal information.
  // You can request access, correction, deletion, or portability of your personal data. Furthermore, you may choose to disable cookies or opt-out of targeted advertising. However, please note that certain features or functionalities of SpotSwap.app may require the use of cookies.
  // Changes to this Privacy Policy
  // SpotSwap.app may update this Privacy Policy from time to time. Any changes to the Privacy Policy will be posted on this page and will be effective as of the date indicated at the top of the policy.
  // Contact Us @magnus@spotswap.app
  // If you have any questions, concerns, or requests regarding this Privacy Policy or our practices,`);
  const [isLoading, setIsLoading] = useState(false);
  const [policy, setPolicy] = useState(" ")
  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = () => {
    setIsLoading(true);
    dispatch(
      staticPagesRequest(
        'privacy_policy',
        res => {
          setIsLoading(false);
          console.log("privacy_policy>>>>",JSON.stringify(res?.page,null,2));
          setPolicy(res?.page?.content);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err?.message);
        },
      ),
    );
  };
  const renderers = {
    h1: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      // Custom styles for h1 tag
      const customStyles = {
        fontSize: size.tiny, // Your custom font size
        // Add any other custom styles you need
      };
  
      return (
        <Text style={[passProps.defaultTextProps.style, customStyles]}>{children}</Text>
      );
    }
  };
  

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleTxtStyle}>SpotSwap{'\n'}Privacy Policy</Text>
        <View style={styles.contentContainer}>
          {policy === '' ? (
            <Text style={styles.txtStyle} />
          ) : (
            <RenderHtml
              contentWidth={scrWidth}
              source={{html: policy}}
              // renderers={renderers}
              defaultTextProps={{
                style: {
                  lineHeight: 19,
                  color: colors.white,
                  fontSize: size.tiny,
                  // fontFamily: family.SFProText_Regular,
                
                },
              }}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PrivacyPolicy;
