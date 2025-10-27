
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-primary">
            Gemini Expense Tracker
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
