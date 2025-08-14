// In App.js in a new project

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StatusBar, Linking, AppState, Alert } from 'react-native';
import Splash from './src/screens/Auth/Splash/Splash';
import Profile from './src/screens/Profile/Profile';
import Home from './src/screens/Home/Home';
import Notification from './src/screens/Notification/Notification';
import messaging from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import images from './src/utils/images';
import SQLite from './src/screens/Sqlite/SQLite';

const Stack = createNativeStackNavigator();

let appOpenedFromBackground = false;

const linking = {
  // enabled: 'auto' /* Automatically generate paths for all screens */,
  prefixes: ['deeplinking://'], // Replace with your scheme and domain
  config: {
    screens: {
      home: 'home',
      notification: 'notification',
      profile: 'profile',
    },
  },
};

function RootStack({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requestUserPermission();
    getToken();
    // bootstrap();// commented out for now
  }, []);

  // async function bootstrap() {
  //   await inAppMessaging().setMessagesDisplaySuppressed(true);
  // }

  // Request permission for notifications
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log('type -->> ', JSON.stringify(type));
      console.log('details -->> ', JSON.stringify(detail));
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          const route = detail?.notification?.data?.route; // Extract the route from notification data
          if (typeof route === 'string' && navigationRef.isReady()) {
            navigationRef.navigate(route as never); // Navigate to the route
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  // Get the FCM token
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  };

  // Listen for foreground messages
  messaging().onMessage(async remoteMessage => {
    if (!remoteMessage.notification) {
      console.error('Notification payload is missing.');
      return;
    }
    console.log('FCM Message:', JSON.stringify(remoteMessage, null, 2));

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH, // Ensure importance is HIGH for visibility
      vibration: true, // Enable vibration for the channel
    });

    const link = remoteMessage?.data?.link;
    const route =
      typeof link === 'string' ? link.replace('deeplinking://', '') : undefined;

    await notifee.displayNotification({
      title: remoteMessage.notification.title || 'Notification',
      body: remoteMessage.notification.body || 'You have a new message.',
      android: {
        channelId,
        smallIcon: 'ic_notification', // Reference the icon resource
        pressAction: {
          id: 'open_route',
        },
      },
      data: {
        route: route ?? '', // Specify the route to navigate to, fallback to empty string
      },
    });
  });

  useEffect(() => {
    // Handle deep link when the app is opened by a notification
    const handleDeepLink = (event: any) => {
      console.log('event ==>> ', JSON.stringify(event));
      const url = event.url;
      console.log('Deep link received:', url); // Debug the URL
      if (url) {
        const route = url.replace('deeplinking://', '');
        console.log('Route is :', route); // Log the route to confirm
        if (navigationRef.isReady() && route) {
          navigationRef.navigate(route as never);
        }
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle case where the app is already running and opened via a deep link
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      console.log('nextAppState ==>> ', JSON.stringify(nextAppState));

      if (nextAppState === 'active') {
        if (appOpenedFromBackground) {
          console.log(
            'App resumed from background. Check for external triggers.',
          );
        } else {
          console.log('App opened normally.');
        }
        appOpenedFromBackground = false;
      } else if (nextAppState === 'background') {
        appOpenedFromBackground = true;
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="sqlite"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="sqlite" component={SQLite} />
    </Stack.Navigator>
  );
}

export const navigationRef = createNavigationContainerRef();

export default function App() {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <RootStack />
    </NavigationContainer>
  );
}
