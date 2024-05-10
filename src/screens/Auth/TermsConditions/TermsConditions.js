import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import {AppHeader, AppLoader} from '../../../components';
import RenderHtml from 'react-native-render-html';
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
const data = `
Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the SpotSwap.app website (the "Service") operated by SpotSwap LLC ("us", "we", or "our").
By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the Service.

Intellectual Property
The Service and its original content, features, and functionality are owned by SpotSwap LLC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You are granted a limited, non-exclusive, non-transferable, non-sublicensable license to use the Service solely for your personal, non-commercial purposes.

User Accounts
To use certain features of the Service, you may be required to create an account. You are solely responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device. You agree to accept responsibility for all activities that occur under your account or password. We reserve the right to refuse or terminate service, terminate accounts, or remove or edit content in our sole discretion.

User Content
You retain any copyright or other intellectual property rights to the content you submit to the Service ("User Content"). By submitting User Content, you grant SpotSwap LLC a worldwide, royalty-free, non-exclusive, irrevocable, perpetual, and fully sublicensable license to use, distribute, reproduce, modify, adapt, publicly perform, and publicly display your User Content in connection with the Service and SpotSwap LLC's business.
You represent and warrant that:
   a. you own or have the necessary rights, licenses, and permissions to submit User Content and grant the licenses and rights described above;
   b. your User Content does not infringe or violate any third-party intellectual property or other rights, including privacy or publicity rights;
   c. your User Content is accurate and does not contain false, misleading, offensive, or defamatory material.

Prohibited Activities
You agree not to engage in any of the following activities in connection with the Service:
   - Using the Service for any unlawful purpose or in violation of any applicable laws or regulations;
   - Posting, transmitting, or otherwise making available any content that is harmful, abusive, obscene, defamatory, or otherwise objectionable;
   - Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity;
   - Interfering with or disrupting the Service or servers or networks connected to the Service.

Limitation of Liability
To the maximum extent permitted by applicable law, in no event shall SpotSwap LLC or its directors, employees, partners, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
   - your access to or use of or inability to access or use the Service;
   - any conduct or content of any third party on the Service;
   - any unauthorized access, use, or alteration of your transmissions or content;
   - any other matter relating to the Service.

Indemnification
You agree to indemnify and hold SpotSwap LLC and its affiliates, officers, directors, employees, and contractors harmless from any claims, demands, losses, liabilities, damages, costs, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of the Service, your violation of these Terms, or your violation of any rights of any third party.

Termination
We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
All provisions of the Terms
`;

const TermsConditions = ({navigation}) => {
  const [terms, setTerms] = useState(`
  Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the SpotSwap.app website (the "Service") operated by SpotSwap LLC ("us", "we", or "our").
  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the Service.
  
  Intellectual Property
  The Service and its original content, features, and functionality are owned by SpotSwap LLC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You are granted a limited, non-exclusive, non-transferable, non-sublicensable license to use the Service solely for your personal, non-commercial purposes.
  
  User Accounts
  To use certain features of the Service, you may be required to create an account. You are solely responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device. You agree to accept responsibility for all activities that occur under your account or password. We reserve the right to refuse or terminate service, terminate accounts, or remove or edit content in our sole discretion.
  
  User Content
  You retain any copyright or other intellectual property rights to the content you submit to the Service ("User Content"). By submitting User Content, you grant SpotSwap LLC a worldwide, royalty-free, non-exclusive, irrevocable, perpetual, and fully sublicensable license to use, distribute, reproduce, modify, adapt, publicly perform, and publicly display your User Content in connection with the Service and SpotSwap LLC's business.
  You represent and warrant that:
     a. you own or have the necessary rights, licenses, and permissions to submit User Content and grant the licenses and rights described above;
     b. your User Content does not infringe or violate any third-party intellectual property or other rights, including privacy or publicity rights;
     c. your User Content is accurate and does not contain false, misleading, offensive, or defamatory material.
  
  Prohibited Activities
  You agree not to engage in any of the following activities in connection with the Service:
     - Using the Service for any unlawful purpose or in violation of any applicable laws or regulations;
     - Posting, transmitting, or otherwise making available any content that is harmful, abusive, obscene, defamatory, or otherwise objectionable;
     - Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity;
     - Interfering with or disrupting the Service or servers or networks connected to the Service.
  
  Limitation of Liability
  To the maximum extent permitted by applicable law, in no event shall SpotSwap LLC or its directors, employees, partners, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
     - your access to or use of or inability to access or use the Service;
     - any conduct or content of any third party on the Service;
     - any unauthorized access, use, or alteration of your transmissions or content;
     - any other matter relating to the Service.
  
  Indemnification
  You agree to indemnify and hold SpotSwap LLC and its affiliates, officers, directors, employees, and contractors harmless from any claims, demands, losses, liabilities, damages, costs, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of the Service, your violation of these Terms, or your violation of any rights of any third party.
  
  Termination
  We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
  All provisions of the Terms
  `);
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch(null);

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = () => {
    setIsLoading(true);
    dispatch(
      staticPagesRequest(
        'terms&condition',
        res => {
          setIsLoading(false);
          console.log("trem and condition >>>>",res?.page?.content);
          setTerms(res?.page?.content);
        },
        err => {
          setIsLoading(false);
          console.log('Err ==> ', err);
        },
      ),
    );
  };

  return (
    <ImageBackground style={styles.rootContainer} source={appImages.app_bg}>
      <AppLoader loading={isLoading} />
      <AppHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleTxtStyle}>Terms &{'\n'}Condition</Text>
        <View style={styles.contentContainer}>
          {terms === '' ? (
            <Text style={styles.txtStyle} />
          ) : (
            // <Text>{terms}</Text>
            <RenderHtml
              contentWidth={scrWidth}
              source={{html: terms}}
              defaultTextProps={{
                style: {
                  lineHeight: 14.5,
                  color: colors.white,
                  fontSize: size.xxsmall,
                  fontFamily: family.SFProText_Regular,
                },
              }}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default TermsConditions;
