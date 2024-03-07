import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserProfile from '../../screens/App/Profile/Profile';
import Settings from '../../screens/App/Profile/Settings';
import FAQs from '../../screens/App/Profile/FAQs';
import PersonalInfo from '../../screens/App/Profile/PersonalInfo';
import UpdateCarInfo from '../../screens/App/Profile/UpdateCarInfo';
import QuickChats from '../../screens/App/Profile/QuickChats';
import AddQuickChat from '../../screens/App/Profile/AddQuickChat';
import EditQuickChat from '../../screens/App/Profile/EditQuickChat';
import PrivacyPolicy from '../../screens/Auth/PrivacyPolicy';
import TermsConditions from '../../screens/Auth/TermsConditions';
import Support from '../../screens/App/Profile/Support/Support/Support';
import CreateTicket from '../../screens/App/Profile/Support/CreateTicket';
import SentSuccess from '../../screens/App/Profile/Support/SentSuccess';
import SupportChat from '../../screens/App/Profile/Support/SupportChat';
import PaymentScreen from '../../screens/App/Profile/Payment/PaymentScreen';
import AddPaymentMethod from '../../screens/App/Profile/Payment/AddPaymentMethod';
import AddCardDetails from '../../screens/App/Profile/Payment/AddCardDetails';
import CardAddedSuccessfully from '../../screens/App/Profile/Payment/CardAddedSuccessfully';
import AddPaypalDetails from '../../screens/App/Profile/Payment/AddPaypalDetails/AddPaypalDetails';
import PaypalAddedSuccessfully from '../../screens/App/Profile/Payment/PaypalAddedSuccessfully';
import EditCardDetails from '../../screens/App/Profile/Payment/EditCardDetails';
import BlockList from '../../screens/App/Profile/BlockList';
import HistoryDetail from '../../screens/App/History/HistoryDetail';

const Stack = createNativeStackNavigator();
function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="UpdateCarInfo" component={UpdateCarInfo} />
      <Stack.Screen name="QuickChats" component={QuickChats} />
      <Stack.Screen name="AddQuickChat" component={AddQuickChat} />
      <Stack.Screen name="EditQuickChat" component={EditQuickChat} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="BlockList" component={BlockList} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="CreateTicket" component={CreateTicket} />
      <Stack.Screen name="SentSuccess" component={SentSuccess} />
      <Stack.Screen name="SupportChat" component={SupportChat} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
      <Stack.Screen name="AddCardDetail" component={AddCardDetails} />
      <Stack.Screen
        name="CardAddSuccessfully"
        component={CardAddedSuccessfully}
      />
      <Stack.Screen name="AddPaypalDetails" component={AddPaypalDetails} />
      <Stack.Screen
        name="PaypalAddedSuccessfully"
        component={PaypalAddedSuccessfully}
      />
      <Stack.Screen name="EditCardDetails" component={EditCardDetails} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
