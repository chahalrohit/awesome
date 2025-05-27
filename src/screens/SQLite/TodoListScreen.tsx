// screens/TodoListScreen.tsx
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {openDB} from '../Database/Database';
import type {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type ListNavProp = StackNavigationProp<RootStackParamList, 'List'>;

// Define RootStackParamList or import it from your navigation types file
type RootStackParamList = {
  List: undefined;
  Add: {reload: () => void};
  // Add other routes here if needed
};

interface TodoListScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'List'>;
}

// 3) Shape of a row in your `todos` table
interface Todo {
  id: number;
  title: string;
  // add any other columns here, e.g. completed?: boolean;
}

export const TodoListScreen: React.FC<TodoListScreenProps> = ({navigation}) => {
  console.log('navigation : ', JSON.stringify(navigation));
  const [todos, setTodos] = useState<Todo[]>([]);
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  // Open DB once
  useEffect(() => {
    let cancelled = false;
    const initDb = async () => {
      const database: SQLiteDatabase = await openDB();
      if (!cancelled) {
        setDb(database);
        loadTodos(database);
      }
    };
    initDb();
    return () => {
      cancelled = true;
    };
  }, []);

  // Function to query rows
  const loadTodos = useCallback(async (database: SQLiteDatabase) => {
    try {
      const [result]: [ResultSet] = await database.executeSql(
        'SELECT * FROM todos;',
      );
      const items: Todo[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        items.push(result.rows.item(i) as Todo);
      }
      setTodos(items);
    } catch (e) {
      console.error('Failed to load todos', e);
    }
  }, []);

  // Remove one
  const deleteTodo = async (id: number) => {
    if (!db) return;
    try {
      await db.executeSql('DELETE FROM todos WHERE id = ?;', [id]);
      loadTodos(db);
    } catch (e) {
      console.error('Failed to delete todo', e);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="＋ Add Todo"
        onPress={() =>
          navigation.navigate('Add', {reload: () => db && loadTodos(db)})
        }
      />
      {todos.length === 0 ? (
        <Text style={styles.emptyText}>No todos—tap “Add”</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}: ListRenderItemInfo<Todo>) => (
            <View style={styles.itemRow}>
              <Text>{item.title}</Text>
              <Button title="❌" onPress={() => deleteTodo(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  list: {marginTop: 20},
  emptyText: {marginTop: 20},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default TodoListScreen;
