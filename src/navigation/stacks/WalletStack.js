import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Wallet from '../../screens/App/Wallet/Wallet';
import TopUp from '../../screens/App/Wallet/TopUp';

const Stack = createNativeStackNavigator();

function WalletStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="TopUp" component={TopUp} />
    </Stack.Navigator>
  );
}

export default WalletStack;
