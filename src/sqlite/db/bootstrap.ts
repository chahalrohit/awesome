// sqlite/db/bootstrap.ts
import { exec, rows, openDB } from './sqlite';
import { migrate } from './migrations';

export async function initDatabase() {
  await openDB('smart_expense.db');
  const result = await migrate();

  // log tables to verify
  const t = await exec(
    `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`,
  );
  console.log(
    'TABLES:',
    rows<{ name: string }>(t).map(x => x.name),
  );
  return result;
}
