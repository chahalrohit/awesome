import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

const Notification = ({navigation}: any) => {
  // Dummy data for notifications
  const notifications = [
    {
      id: '1',
      title: 'Order Delivered',
      message: 'Your order #1234 has been delivered.',
      time: '2h ago',
    },
    {
      id: '2',
      title: 'New Offer',
      message: 'Flat 50% off on all items! Limited time offer.',
      time: '5h ago',
    },
    {
      id: '3',
      title: 'Update Available',
      message: 'Version 2.0 is now available. Update your app.',
      time: '1d ago',
    },
    {
      id: '4',
      title: 'Payment Successful',
      message: 'Your payment for $100 was successful.',
      time: '2d ago',
    },
    {
      id: '5',
      title: 'Reminder',
      message: 'Don’t forget your appointment tomorrow at 10 AM.',
      time: '3d ago',
    },
  ];

  // Render a single notification item
  const renderNotification = ({item}: {item: any}) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
      />
      <Button title="Go To Home" onPress={() => navigation.navigate('home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default Notification;
