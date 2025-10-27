import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Expense } from '../types';
import { CATEGORY_MAP, CATEGORIES } from '../constants';

interface CategoryPieChartProps {
  expenses: Expense[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    if (expenses.length === 0) return [];
    
    const categoryTotals = expenses.reduce((acc, expense) => {
      // Fix: Ensure the expense amount is treated as a number to prevent arithmetic errors.
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_MAP.get(name as any)?.color || '#9ca3af',
    })).sort((a, b) => b.value - a.value);

  }, [expenses]);

  return (
    <div className="bg-card p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Spending by Category</h2>
      <div style={{ width: '100%', height: 300 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-secondary">No data to display yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPieChart;