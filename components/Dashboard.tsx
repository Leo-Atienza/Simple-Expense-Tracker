
import React from 'react';

interface DashboardProps {
  totals: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
}

const StatCard: React.FC<{ title: string; amount: number, colorClass: string }> = ({ title, amount, colorClass }) => {
  return (
    <div className={`bg-card p-6 rounded-xl shadow-md border-l-4 ${colorClass}`}>
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-text-primary">
        ${amount.toFixed(2)}
      </p>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ totals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Today's Spending" amount={totals.daily} colorClass="border-rose-500" />
      <StatCard title="This Week" amount={totals.weekly} colorClass="border-amber-500" />
      <StatCard title="This Month" amount={totals.monthly} colorClass="border-sky-500" />
      <StatCard title="This Year" amount={totals.yearly} colorClass="border-emerald-500" />
    </div>
  );
};

export default Dashboard;
