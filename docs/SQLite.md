📦 React Native SQLite Setup with Migrations

This project uses react-native-sqlite-storage to store and manage data locally in a SQLite database.
We have also implemented a migration system so that:

If the database does not exist, it will be created automatically and some default data will be inserted.

If the database already exists, the app will simply load the data (without creating tables or inserting duplicates).

🗂 Folder Structure
sqlite/
│── db/
│ │── sqlite.ts # DB connection helpers
│ │── bootstrap.ts # Opens DB & runs migrations
│ │── migrations.ts # Handles table creation & version upgrades
│── expenses/
│ └── repo.ts # Your app’s custom data queries (addExpense, sumByCategory, etc.)

⚙️ How It Works (Step-by-Step)

1. Opening the Database

File: sqlite.ts

export async function openDB(name = 'smart_expense.db') {
if (\_db) return \_db;
\_db = await SQLite.openDatabase({ name, location: 'default' });
return \_db;
}

If \_db is already open, we reuse it.

Otherwise, we open a new database file (smart_expense.db).

Location is default → Stored inside the app’s internal storage.

2. Running Queries
   export async function exec(sql: string, args: QueryArgs = []) {
   const db = await openDB();
   const [res] = await db.executeSql(sql, args);
   return res;
   }

Runs SQL statements like CREATE TABLE, INSERT, SELECT, etc.

Always returns a ResultSet so you can read data using rows() helper.

3. Migration System

File: migrations.ts

What is a migration?

A migration is a set of changes applied to the database structure (tables, columns, indexes, etc.).

We track the migration progress using PRAGMA user_version.

Step A: Checking DB Version
const from = await getUserVersion();

If from is 0 → Database is brand new.

If from is 1+ → Database already exists.

Step B: Creating Tables (Fresh Install)
CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS expenses (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
amount REAL NOT NULL,
category_id INTEGER,
ts INTEGER NOT NULL,
note TEXT,
payment_method TEXT,
FOREIGN KEY (category_id) REFERENCES categories(id)
);

We also create indexes for better search speed:

CREATE INDEX IF NOT EXISTS idx_expenses_ts ON expenses(ts);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category_id);

Step C: Seeding Default Data
const defaults = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];
for (const name of defaults) {
await exec(`INSERT OR IGNORE INTO categories(name) VALUES (?);`, [name]);
}

Inserts common categories if they don't already exist.

Step D: Adding a Demo Expense
const foodRS = await exec(`SELECT id FROM categories WHERE name=? LIMIT 1;`, ['Food']);
const foodId = rows<{id:number}>(foodRS)[0]?.id ?? null;

await exec(
`INSERT INTO expenses (title, amount, category_id, ts, note, payment_method)
   VALUES (?, ?, ?, ?, ?, ?)`,
['Lunch', 199, foodId, Date.now(), 'Veg thali', 'upi']
);

Adds a sample expense linked to the "Food" category.

Step E: Updating Version
await exec(`PRAGMA user_version = 1;`);

Marks migration complete so next time app runs, it skips creation & seeding.

4. Bootstrap File

File: bootstrap.ts

export async function initDatabase() {
await openDB('smart_expense.db');
const result = await migrate();
const t = await exec(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;`);
console.log('TABLES:', rows(t).map(x => x.name));
return result;
}

Opens DB

Runs migrations

Logs available tables (for debugging)

5. App.tsx Usage
   useEffect(() => {
   (async () => {
   await initDatabase();
   const s = await sumByCategory(new Date().getFullYear(), new Date().getMonth());
   setSummary(s);
   setReady(true);
   })();
   }, []);

Runs migrations at startup

Loads category totals

Shows loader until DB is ready

🧠 Why This Works

Idempotent → Running migrations twice won’t create duplicate tables or rows.

Versioned → If DB schema changes, just add a new if (to < 2) { ... } block in migrations.ts.

Safe Transactions → If something fails, we ROLLBACK changes.

No Extra Calls → We only seed data when DB is brand new.

🚀 How to Add a New Migration

Example: Adding a new currency column.

if (to < 2) {
try {
await begin();
await exec(`ALTER TABLE expenses ADD COLUMN currency TEXT DEFAULT 'INR';`);
await setUserVersion(2);
await commit();
to = 2;
} catch (e) {
await rollback();
throw e;
}
}

🏁 Summary

First install → Creates DB + tables + sample data.
Next runs → Skips creation, directly loads data.
Future changes → Add migration blocks with version check.
Safe → Uses transactions to prevent partial updates.
