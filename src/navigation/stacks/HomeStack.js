import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/App/Home/Home';
import AddDescription from '../../screens/App/Home/AddDescription';
import FindSpot from '../../screens/App/Home/FindSpot';
import ConnectToHost from '../../screens/App/Home/ConnectToHost';
import ActivateSpot from '../../screens/App/Home/ActivateSpot';
import ConnectedToFinder from '../../screens/App/Home/ConnectedToFinder';
import ReceivedPayment from '../../screens/App/Home/ReceivedPayment';
import TransactionScreen from '../../screens/App/Home/TransactionScreen';
import ConfirmArrival from '../../screens/App/Home/ConfirmArrival';
import SlotCancelled from '../../screens/App/Home/SlotCancelled';
import Inbox from '../../screens/App/Chat/Inbox';
import AddQuickChat from '../../screens/App/Profile/AddQuickChat';

const Stack = createNativeStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddDescription" component={AddDescription} />
      <Stack.Screen name="FindSpot" component={FindSpot} />
      <Stack.Screen name="ConnectToHost" component={ConnectToHost} />
      <Stack.Screen name="ActivateSpot" component={ActivateSpot} />
      <Stack.Screen name="ConnectedToFinder" component={ConnectedToFinder} />
      <Stack.Screen name="ReceivedPayment" component={ReceivedPayment} />
      <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
      <Stack.Screen name="ConfirmArrival" component={ConfirmArrival} />
      <Stack.Screen name="SlotCancelled" component={SlotCancelled} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="AddQuickChat" component={AddQuickChat} />
    </Stack.Navigator>
  );
}

export default HomeStack;
