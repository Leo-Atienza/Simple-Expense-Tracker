
import React, { useState, useCallback } from 'react';
import type { Expense } from '../types';
import { getSpendingInsights } from '../services/geminiService';
import { SparklesIcon } from './Icons';

interface InsightsProps {
  expenses: Expense[];
}

const Insights: React.FC<InsightsProps> = ({ expenses }) => {
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetInsights = useCallback(async () => {
    if (expenses.length < 3) {
      setError('Add at least 3 expenses to get insights.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setInsight('');
    try {
      const recentExpenses = expenses.slice(0, 20); // Limit to recent 20 expenses for prompt
      const result = await getSpendingInsights(recentExpenses);
      setInsight(result);
    } catch (e) {
      setError('Could not fetch insights. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [expenses]);

  return (
    <div className="bg-card p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-text-primary">AI Insights</h2>
        <button
          onClick={handleGetInsights}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>{isLoading ? 'Generating...' : 'Get Insights'}</span>
        </button>
      </div>
      
      <div className="mt-4 p-4 min-h-[100px] bg-indigo-50 rounded-lg">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {insight && <p className="text-sm text-indigo-800 whitespace-pre-wrap">{insight}</p>}
        {!isLoading && !insight && !error && (
            <p className="text-sm text-text-secondary">Click the button to get an AI-powered summary of your spending habits.</p>
        )}
      </div>
    </div>
  );
};

export default Insights;
