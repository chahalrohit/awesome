import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import {RAZOR_PAY_KEY_ID} from '@env';

const RazorPay = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://<YOUR_BACKEND_URL>/create-order',
        {
          amount: 50, // ₹50
        },
      );

      const order = response.data;

      const options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: RAZOR_PAY_KEY_ID,
        amount: order.amount.toString(),
        name: 'foo',
        order_id: order.id, // <-- Required
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Razorpay Software',
        },
        theme: {color: '#F37254'},
      };

      RazorpayCheckout.open(options)
        .then(data => {
          console.log(`Success: ${data.razorpay_payment_id}`);
        })
        .catch(error => {
          console.log(`Error: ${error.code} | ${error.description}`);
        });
    } catch (err) {
      console.error('Order creation failed', err);
      console.log('Failed to create order');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={handlePayment} style={styles.button}>
          <Text style={styles.title}>RazorPay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RazorPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F37254',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
});
