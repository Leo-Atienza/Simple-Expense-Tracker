
import React from 'react';
import type { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">No expenses added yet.</p>
          <p className="text-sm text-gray-400">Tap the '+' button to get started!</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
