import {ONESIGNAL_APP_ID} from '@env';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Alert, Linking, View} from 'react-native';
import Fastimage from 'react-native-fast-image';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import Images from '../../../utils/Images';
import styles from './Splash.styles';

const Splash = ({navigation}: {navigation: any}) => {
  const [openedFromNotification, setOpenedFromNotification] = useState(false);

  // Initialize OneSignal
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);

    // Listen for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []);

  // Request permissions and register app
  useEffect(() => {
    requestUserPermission();
    requestPermissions();
    registerAppWithFCM();
  }, []);

  // Handle initial notification
  useEffect(() => {
    checkInitialNotification();
  }, []);

  async function requestPermissions() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission granted');
    } else {
      console.log('Permission denied');
    }
  }

  async function checkInitialNotification() {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      setOpenedFromNotification(true); // Track that app opened from notification
      const link = initialNotification.notification?.data?.link;
      console.log('checkInitialNotification link ==>> ', JSON.stringify(link));

      if (link) {
        Linking.openURL(link);
        navigation.navigate('notification'); // Navigate to the notification screen
      }
    }
  }

  // Handle navigation to "home" screen
  useEffect(() => {
    if (!openedFromNotification) {
      const timeID = setTimeout(() => {
        navigation.navigate('home');
      }, 2000);
      return () => clearTimeout(timeID);
    }
  }, [navigation, openedFromNotification]);

  // Handle notifications from background or quit states
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      setOpenedFromNotification(true); // Track notification click
      const link = remoteMessage.data?.link;
      console.log('remote message link ==>> ', JSON.stringify(link));

      if (link) {
        Linking.openURL(link);
        navigation.navigate('notification');
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setOpenedFromNotification(true); // Track notification click
          const link = remoteMessage.data?.link;
          console.log('initial notification link ==>> ', JSON.stringify(link));

          if (link) {
            Linking.openURL(link);
            navigation.navigate('notification');
          }
        }
      });
  }, []);

  // Register FCM
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }

  // Request user permissions for notifications
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    messaging().setAutoInitEnabled(true);

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <View style={styles.container}>
      <Fastimage source={Images} style={{width: 300, height: 300}} />
    </View>
  );
};

export default Splash;
