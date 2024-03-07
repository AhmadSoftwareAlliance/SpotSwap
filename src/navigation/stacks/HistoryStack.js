import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserHistory from '../../screens/App/History/History';
import HistoryDetail from '../../screens/App/History/HistoryDetail';

const Stack = createNativeStackNavigator();

function HistoryStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="UserHistory"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="UserHistory" component={UserHistory} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
    </Stack.Navigator>
  );
}

export default HistoryStack;
