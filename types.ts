
export type Category = 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Health' | 'Utilities' | 'Other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string; // ISO string format
}
