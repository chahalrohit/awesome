import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import Button from '../components/Button';
import CustomText from '../components/CustomText';
import {horizontalSpace, wp} from '../utils/dimensions';
import TextStyles from '../utils/textStyles';

const UseState = () => {
  const [count, setCount] = useState<number>(0);

  const onPressButton = () => {
    setCount(count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomText style={TextStyles.heading}>Use of useState</CustomText>
        <CustomText style={[TextStyles.caption, {alignSelf: 'center'}]}>
          Value is {count}
        </CustomText>
        <Button
          onPress={onPressButton}
          buttonName="Increment"
          style={{marginTop: wp(10)}}
        />
      </View>
    </SafeAreaView>
  );
};
export default UseState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalSpace,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
