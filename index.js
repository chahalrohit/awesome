/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import { AppRegistry, Linking, LogBox } from 'react-native';
import firebase from '@react-native-firebase/app';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { navigationRef } from './App';
import RazoyPay from './src/screens/PaymentGateways/RazorPay/RazoyPay';
import Button from './src/components/Button';
import UseState from './src/hooks/UseState';
import UseMemo from './src/screens/Hooks/UseMemo'
LogBox.ignoreAllLogs();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background:', remoteMessage);

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH, // Ensure importance is HIGH for visibility
    vibration: true, // Enable vibration for the channel
  });

  // Forward to Notifee if needed
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
      route: route, // Specify the route to navigate to
    },
  });
});

const firebaseConfig = {
  apiKey: 'AIzaSyCtYRbB-bmPLty6OgZcDsXeHbp0HHlqW2Y',
  // authDomain: '',
  projectId: 'awesome-aa418',
  storageBucket: 'awesome-aa418.firebasestorage.app',
  messagingSenderId: '223502244498',
  appId: '1:223502244498:ios:5771772e1e9d415247e44b',
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  console.log('Firebase already initialized');
}
console.log(firebase.apps); // Should return an array with your Firebase app

AppRegistry.registerComponent(appName, () => UseMemo);
