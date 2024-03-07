import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import SocialRegister from '../../screens/Auth/SocialRegister';
import AddCarInfo from '../../screens/Auth/AddCarInfo';
import AddCarPics from '../../screens/Auth/AddCarPics';
import Welcome from '../../screens/Auth/Welcome';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import VerificationSent from '../../screens/Auth/VerificationSent';
import VerifyOTP from '../../screens/Auth/VerifyOTP';
import ResetPassword from '../../screens/Auth/ResetPassword';
import PasswordUpdated from '../../screens/Auth/PasswordUpdated';
import PrivacyPolicy from '../../screens/Auth/PrivacyPolicy';
import TermsConditions from '../../screens/Auth/TermsConditions';

const Stack = createNativeStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SocialRegister" component={SocialRegister} />
      <Stack.Screen name="AddCarInfo" component={AddCarInfo} />
      <Stack.Screen name="AddCarPics" component={AddCarPics} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerificationSent" component={VerificationSent} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
    </Stack.Navigator>
  );
}

export default AuthStack;
