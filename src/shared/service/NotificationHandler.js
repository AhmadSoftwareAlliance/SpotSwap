import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
export async function requestPermission() {
  console.log("requestPermission called");
  try {
    let status = false;
    if (Platform.OS == 'ios') {
      const authStatus = await messaging().requestPermission();
      status = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else {
      if (Platform.Version > 32) {
        console.log('androidddd')
        const authStatus = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        status = authStatus == RESULTS.GRANTED
      } else {
        status = true
      }
    }
    if (status) {
      let token = await getFcmToken();
      return token;
    }
  } catch (error) {
    // User has rejected permissions
    console.log('token permission rejected');
  }
}

const getFcmToken = async () => {
  let oldToken = await AsyncStorage.getItem('fcmToken');
  if (oldToken == null) {
    try {
      messaging()
        .hasPermission()
        .then(async enabled => {
          if (enabled) {
            let token = await messaging().getToken();
            console.log('Token>>', token);
            AsyncStorage.setItem('fcmToken', token);
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                console.log('+++ PERMISSION REQUESTED +++++');
              })
              .catch(error => {
                console.log(' +++++ ERROR RP ++++ ' + error);
              });
          }
        })
        .catch(error => {
          console.log(' +++++ ERROR +++++ ' + error);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("oldToken", oldToken);
    return oldToken;
  }
};

export const NotificationListener = navigation => {
  // When the application is running, but in the background
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('Background State Notification');
    onClickNotification(remoteMessage, navigation);
  });
  // To listen to messages in the foreground
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground State Notification');
    if(Platform.OS=="ios"){
      onClickNotification(remoteMessage, navigation);
    }else{
      LocalNotification(remoteMessage, navigation);
    }
    
   
  });
  // When the application is opened from a quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        onClickNotification(remoteMessage, navigation);
      }
    })
    .catch(err => {
      console.log('Error ==> ', err);
    });
};

export const LocalNotification = (notify, navigation) => {
  PushNotification.localNotification({
    channelId: 'SpotSwap',
    title: notify?.notification?.title,
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher',
    message: notify?.notification?.body,
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  });
  PushNotification.createChannel(
    {
      channelId: 'SpotSwap', // (required)
      channelName: 'SpotSwap', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('doneeeeee')
      if (notification.userInteraction) {
        onClickNotification(notify, navigation);
      } else {
        console.log('User received notification');
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios' ? true : false,
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  });
  
};

const onClickNotification = (notify, navigation) => {
  console.log('okkkkkkkkkkkkkkk')
  const notificationObj = notify?.data;
  const dataObj = JSON?.parse(notificationObj?.data);
  switch (notificationObj?.notification_type) {
    case 'connection_created':
      navigation?.navigate('ConnectedToFinder', { item: dataObj });
      break;
    case 'cancel_connection':
      navigation?.navigate('SlotCancelled', { item: dataObj });
      break;
    case 'transfer_parking_slot':
      navigation?.navigate('TransactionScreen', { item: dataObj });
      break;
    case 'confirm_arrival':
      navigation?.navigate('ConfirmArrival', { item: dataObj });
      break;
    case 'still_interested':
      navigation?.navigate('ConnectedToFinder', { item: dataObj });
      break;
    case 'payment_received':
      navigation?.navigate('ReceivedPayment', { item: dataObj });
      break;
    default:
      break;
  }
};
