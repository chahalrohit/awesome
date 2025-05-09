import React, {useMemo, useCallback, useState, useRef} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';

const UseCallback: React.FC = () => {
  const [number, setNumber] = useState<number>(5);

  const expensiveCalculation = (num: number) => {
    console.log('Calculating...');
    return num * 100;
  };

  //   const result = useMemo(() => expensiveCalculation(20), [number]);
  const result = expensiveCalculation(number);

  const onButtonPress = () => {
    setNumber(number + 10);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      {/* <Text style={{alignSelf: 'center', marginBottom: 25}}>{result}</Text> */}
      <Button buttonName="Submit" onPress={onButtonPress} />
    </SafeAreaView>
  );
};
export default UseCallback;
