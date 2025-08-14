// sqlite/db/migrations.ts
import { begin, commit, exec, rollback, rows } from './sqlite';

async function getUserVersion(): Promise<number> {
  const rs = await exec('PRAGMA user_version;');
  const row = rows<any>(rs)[0] ?? {};
  const v = row.user_version ?? Object.values(row)[0] ?? 0;
  return Number(v) || 0;
}
async function setUserVersion(v: number) {
  await exec(`PRAGMA user_version = ${v};`);
}

/**
 * Fresh install (v0 -> v1):
 * - BEGIN
 * - Create tables + indexes
 * - Seed default categories + 1 demo expense
 * - PRAGMA user_version = 1
 * - COMMIT
 *
 * Existing DB (v>=1):
 * - No seeding; future upgrades yahan append karna
 */
export async function migrate(): Promise<{
  from: number;
  to: number;
  fresh: boolean;
}> {
  console.log('MIGRATE START');
  const from = await getUserVersion();
  let to = from;
  let fresh = false;

  if (from < 1) {
    try {
      await begin();
      await exec('PRAGMA foreign_keys = ON;');

      await exec(`
        CREATE TABLE IF NOT EXISTS categories (
          id   INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );
      `);

      await exec(`
        CREATE TABLE IF NOT EXISTS expenses (
          id              INTEGER PRIMARY KEY AUTOINCREMENT,
          title           TEXT    NOT NULL,
          amount          REAL    NOT NULL,
          category_id     INTEGER,
          ts              INTEGER NOT NULL,
          note            TEXT,
          payment_method  TEXT,
          FOREIGN KEY (category_id) REFERENCES categories(id)
        );
      `);

      await exec(
        `CREATE INDEX IF NOT EXISTS idx_expenses_ts       ON expenses(ts);`,
      );
      await exec(
        `CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category_id);`,
      );

      // ---- Seed (only fresh DB) ----
      const defaults = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];
      for (const name of defaults) {
        await exec(`INSERT OR IGNORE INTO categories(name) VALUES (?);`, [
          name,
        ]);
      }
      const foodRS = await exec(
        `SELECT id FROM categories WHERE name=? LIMIT 1;`,
        ['Food'],
      );
      const foodId = rows<{ id: number }>(foodRS)[0]?.id ?? null;

      await exec(
        `INSERT INTO expenses (title, amount, category_id, ts, note, payment_method)
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['Lunch', 199, foodId, Date.now(), 'Veg thali', 'upi'],
      );

      await setUserVersion(1);
      await commit();

      to = 1;
      fresh = true;
    } catch (e) {
      console.error('MIGRATE v0->v1 FAILED:', e);
      await rollback();
      throw e;
    }
  }

  // Example future migration:
  // if (to < 2) {
  //   try {
  //     await begin();
  //     await exec(`ALTER TABLE expenses ADD COLUMN currency TEXT DEFAULT 'INR';`);
  //     await setUserVersion(2);
  //     await commit();
  //     to = 2;
  //   } catch (e) {
  //     await rollback();
  //     throw e;
  //   }
  // }

  console.log('MIGRATE DONE ->', { from, to, fresh });
  return { from, to, fresh };
}
