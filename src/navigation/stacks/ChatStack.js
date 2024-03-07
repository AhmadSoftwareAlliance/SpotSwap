import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Chat from '../../screens/App/Chat/Chat';
import Inbox from '../../screens/App/Chat/Inbox';

const Stack = createNativeStackNavigator();

function ChatStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Inbox" component={Inbox} />
    </Stack.Navigator>
  );
}

export default ChatStack;
