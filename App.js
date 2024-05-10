import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox, Platform, StatusBar} from 'react-native';
import {
  FB_ID,
  WEB_CLIENT_ID,
  WEB_CLIENT_ID_IOS,
  GOOGLE_MAPS_API_KEY,
  STRIPE_PUBLISHABLE_KEY,
} from '@env';
import {enableLatestRenderer} from 'react-native-maps';
import MainNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persistor} from './src/redux/store';
import {setupAxios} from './src/shared/exporter';
import Geocoder from 'react-native-geocoding';
import {StripeProvider} from '@stripe/stripe-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';

// ignore warnings
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

let web_client_id = Platform.OS == 'ios' ? WEB_CLIENT_ID_IOS : WEB_CLIENT_ID;

console.log("web_client_id",STRIPE_PUBLISHABLE_KEY);
// fb setup
Settings.setAppID(FB_ID);
Settings.initializeSDK();

// new renderer for Google Maps on Android
enableLatestRenderer();

// Initialize the Geocoder module
Geocoder.init(GOOGLE_MAPS_API_KEY);

const App = () => {
  // axios setup
  useEffect(() => {
    setupAxios();
    GoogleSignin.configure({
      webClientId: web_client_id,
    });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <PersistGate persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </StripeProvider>
    </Provider>
  );
};

export default App;
