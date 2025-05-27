// e.g. in App.js or a service module
import {openDB} from './Database';

async function setupDatabase() {
  const db = await openDB();

  // 1. Create a table if it doesn't exist
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       done INTEGER
     );`,
  );

  // 2. Insert a new row
  const title = 'Buy groceries';
  await db.executeSql('INSERT INTO todos (title, done) VALUES (?, 0);', [
    title,
  ]);

  // 3. Query rows
  const [results] = await db.executeSql('SELECT * FROM todos;');
  const todos = [];
  for (let i = 0; i < results.rows.length; i++) {
    todos.push(results.rows.item(i));
  }
  console.log('📋 Todos:', todos);

  // 4. Update a row
  await db.executeSql('UPDATE todos SET done = 1 WHERE id = ?;', [todos[0].id]);

  // 5. Delete a row
  await db.executeSql('DELETE FROM todos WHERE id = ?;', [todos[0].id]);

  // 6. Close when done (optional)
  await db.close();
}
