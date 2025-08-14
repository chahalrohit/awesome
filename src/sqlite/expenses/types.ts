export interface Expense {
  id: number;
  title: string;
  amount: number;
  category_id: number | null;
  ts: number; // epoch ms
  note?: string | null;
  payment_method?: 'cash' | 'card' | 'upi' | string | null;
}

export interface NewExpense extends Omit<Expense, 'id'> {}
