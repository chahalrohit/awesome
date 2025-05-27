// Database.js
import SQLite from 'react-native-sqlite-storage';

// (optional) enable promise-based API
SQLite.enablePromise(true);

const database_name = 'awesome.db';
const database_location = 'default';

export function openDB() {
  return SQLite.openDatabase(
    {name: database_name, location: database_location},
    () => console.log('✅ Database opened'),
    error => console.error('❌ Failed to open database:', error),
  );
}
