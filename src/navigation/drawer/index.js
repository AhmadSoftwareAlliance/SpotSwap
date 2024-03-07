import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import HomeStack from '../stacks/HomeStack';
import HistoryStack from '../stacks/HistoryStack';
import ChatStack from '../stacks/ChatStack';
import WalletStack from '../stacks/WalletStack';
import ProfileStack from '../stacks/ProfileStack';

import DrawerHeader from './DrawerHeader';
import {platformOrientedCode} from '../../shared/exporter';

const DrawerNav = ({route}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {width: '65%'},
      }}
      useLegacyImplementation={platformOrientedCode(false, true)}
      drawerContent={props => <DrawerHeader {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="History"
        component={HistoryStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Wallet"
        component={WalletStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
