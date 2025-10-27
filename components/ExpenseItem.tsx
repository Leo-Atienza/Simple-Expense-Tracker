
import React from 'react';
import { format, parseISO } from 'date-fns';
import type { Expense } from '../types';
import { CATEGORY_MAP } from '../constants';
import { TrashIcon } from './Icons';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  const categoryInfo = CATEGORY_MAP.get(expense.category);
  const Icon = categoryInfo?.icon || (() => null);

  return (
    <li className="flex items-center justify-between py-4 group">
      <div className="flex items-center space-x-4">
        <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: categoryInfo?.color ? `${categoryInfo.color}20` : '#e5e7eb' }}
        >
          <Icon className="w-6 h-6" style={{ color: categoryInfo?.color }}/>
        </div>
        <div>
          <p className="text-md font-medium text-text-primary">{expense.description}</p>
          <p className="text-sm text-text-secondary">{format(parseISO(expense.date), 'MMM d, yyyy')}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-md font-semibold text-text-primary">${expense.amount.toFixed(2)}</p>
        <button 
          onClick={() => onDelete(expense.id)} 
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete expense"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
