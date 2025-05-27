// screens/AddTodoScreen.tsx
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {openDB} from '../Database/Database';

interface AddTodoScreenProps {
  navigation: any;
  route: any;
}

const AddTodoScreen: React.FC<AddTodoScreenProps> = ({navigation}) => {
  const [title, setTitle] = useState<string>('');

  const save = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title');
      return;
    }
    try {
      const db = await openDB();
      await db.executeSql('INSERT INTO todos (title, done) VALUES (?, 0);', [
        title.trim(),
      ]);
      // Call reload on the list screen (if passed)
      //   route.params.reload?.();
      navigation.goBack();
    } catch (e) {
      console.error('Error saving todo', e);
      Alert.alert('Error', 'Could not save todo. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Todo title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Save" onPress={save} />
    </SafeAreaView>
  );
};
export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});
