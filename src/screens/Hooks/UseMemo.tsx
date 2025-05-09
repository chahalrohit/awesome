import React, {useMemo, useCallback, useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import {generateFakePeople} from '../../utils/faker/faker';
import {ITEM} from '../../utils/faker/faker.types';

const UseMemo: React.FC = () => {
  const [number, setNumber] = useState<number>(5);
  const [data, setData] = useState<ITEM[]>([]);

  useEffect(() => {
    return setData(generateFakePeople());
  }, []);

  const expensiveCalculation = (num: number) => {
    console.log('Calculating... : ', num * 10);
    return num * 10;
  };

  const result = useMemo(() => expensiveCalculation(number), [number]);

  const onButtonPress = () => {
    setNumber(number + 10);
  };

  const renderItem = useCallback(
    ({item, index}: {item: ITEM; index: number}) => {
      return (
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{marginLeft: 10}}>
            <Text>{item.fullName}</Text>
            <Text>{item.email}</Text>
            <Text>{item.phone}</Text>
            <Text>
              {item.address.city}, {item.address.country}
            </Text>
          </View>
        </View>
      );
    },
    [data],
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <Text style={{alignSelf: 'center', marginBottom: 25}}>{result}</Text>
      <Button buttonName="Submit" onPress={onButtonPress} />
    </SafeAreaView>
  );
};
export default UseMemo;
