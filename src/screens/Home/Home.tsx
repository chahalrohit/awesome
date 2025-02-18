import React from 'react';
import {Button, Text, View} from 'react-native';
import colors from '../../utils/colors';

function HomeScreen({navigation}: any) {
  // useEffect(() => {
  //   let url = '';
  //   if (Platform.OS === 'ios') {
  //     url = 'https://apps.apple.com/app/id6445003026';
  //   } else if (Platform.OS === 'android') {
  //     url =
  //       'https://play.google.com/store/apps/details?id=com.pravisht.MhbMobile&hl=en';
  //   }
  //   // openBrowser(url);
  // }, []);

  // const openBrowser = async (url: string) => {
  //   const supported = await Linking.canOpenURL(url);

  //   if (supported) {
  //     await Linking.openURL(url);
  //   } else {
  //     console.error(`Cannot open URL: ${url}`);
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}>
      <Text style={{fontWeight: '800', fontSize: 25, color: '#000'}}>
        Home Screen
      </Text>
      <View style={{marginTop: 50}} />
      <Button
        title="Go To Profile"
        onPress={() => navigation.navigate('profile')}
      />
      <View style={{marginTop: 50}} />
      <Button
        title="Go To Notifications"
        onPress={() => navigation.navigate('notification')}
      />
    </View>
  );
}
export default HomeScreen;
