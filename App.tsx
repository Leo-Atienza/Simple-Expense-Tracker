
import React, { useState, useMemo, useCallback } from 'react';
import { isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import type { Expense, Category } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import AddExpenseModal from './components/AddExpenseModal';
import CategoryPieChart from './components/CategoryPieChart';
import Insights from './components/Insights';
import { PlusIcon } from './components/Icons';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses(prevExpenses => [
      { ...expense, id: new Date().toISOString() + Math.random() },
      ...prevExpenses,
    ]);
  };

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  }, [setExpenses]);

  const totals = useMemo(() => {
    const now = new Date();
    return expenses.reduce(
      (acc, expense) => {
        const expenseDate = parseISO(expense.date);
        const amount = expense.amount;
        if (isToday(expenseDate)) acc.daily += amount;
        if (isThisWeek(expenseDate, { weekStartsOn: 1 })) acc.weekly += amount;
        if (isThisMonth(expenseDate)) acc.monthly += amount;
        if (isThisYear(expenseDate)) acc.yearly += amount;
        return acc;
      },
      { daily: 0, weekly: 0, monthly: 0, yearly: 0 }
    );
  }, [expenses]);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <Header />
      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        <Dashboard totals={totals} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ExpenseList expenses={expenses} onDelete={deleteExpense}/>
          </div>
          <div className="space-y-8">
             <CategoryPieChart expenses={expenses} />
             <Insights expenses={expenses} />
          </div>
        </div>
      </main>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-300 z-50"
        aria-label="Add new expense"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={addExpense}
      />
    </div>
  );
};

export default App;
