// sqlite/db/sqlite.ts
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';

SQLite.DEBUG(true); // dev only (turn OFF in production)
SQLite.enablePromise(true);

export type QueryArgs = (string | number | null)[];

let _db: SQLiteDatabase | null = null;

export async function openDB(
  name = 'smart_expense.db',
): Promise<SQLiteDatabase> {
  if (_db) return _db;
  _db = await SQLite.openDatabase({ name, location: 'default' });
  return _db;
}

export async function exec(
  sql: string,
  args: QueryArgs = [],
): Promise<ResultSet> {
  const db = await openDB();
  const [res] = await db.executeSql(sql, args);
  return res;
}

// --- Minimal manual transaction helpers ---
export async function begin(): Promise<void> {
  await exec('BEGIN');
}
export async function commit(): Promise<void> {
  await exec('COMMIT');
}
export async function rollback(): Promise<void> {
  try {
    await exec('ROLLBACK');
  } catch {}
}

export function rows<T = any>(rs: ResultSet): T[] {
  const out: T[] = [];
  for (let i = 0; i < rs.rows.length; i++) out.push(rs.rows.item(i));
  return out;
}
