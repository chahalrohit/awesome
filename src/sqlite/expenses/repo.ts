// sqlite/expenses/repo.ts
import { exec, rows } from '../db/sqlite';

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category_id: number | null;
  ts: number; // epoch ms
  note?: string | null;
  payment_method?: string | null;
}

export interface NewExpense extends Omit<Expense, 'id'> {}

export async function addExpense(e: NewExpense): Promise<number> {
  const rs = await exec(
    `INSERT INTO expenses (title, amount, category_id, ts, note, payment_method)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      e.title,
      e.amount,
      e.category_id ?? null,
      e.ts,
      e.note ?? null,
      e.payment_method ?? null,
    ],
  );
  // @ts-ignore insertId exists at runtime
  return rs.insertId as number;
}

export async function sumByCategory(
  year: number,
  monthZeroBased: number,
): Promise<{ name: string; total: number }[]> {
  const start = new Date(year, monthZeroBased, 1).getTime();
  const end = new Date(year, monthZeroBased + 1, 1).getTime();
  const rs = await exec(
    `SELECT COALESCE(c.name, 'Uncategorized') AS name, SUM(e.amount) AS total
     FROM expenses e
     LEFT JOIN categories c ON e.category_id = c.id
     WHERE e.ts >= ? AND e.ts < ?
     GROUP BY c.name
     ORDER BY total DESC;`,
    [start, end],
  );
  return rows<{ name: string; total: number }>(rs);
}
