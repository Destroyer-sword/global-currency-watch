import React from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header';
import CurrencyDropdown from './components/CurrencyDropdown';
import CurrencyGrid from './components/CurrencyGrid';

function App() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-green-200 text-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <CurrencyDropdown />
          </div>
          <CurrencyGrid />
        </main>
      </div>
    </CurrencyProvider>
  );
}

export default App;