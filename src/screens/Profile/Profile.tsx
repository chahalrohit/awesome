import React from 'react';
import colors from '../../utils/colors';
import {View, Text, Button} from 'react-native';

function DetailScreen({navigation}: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}>
      <Text>Profile Screen</Text>
      <Button title="Go To Home" onPress={() => navigation.navigate('home')} />
    </View>
  );
}
export default DetailScreen;
