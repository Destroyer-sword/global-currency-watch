import React from 'react';

const Header = () => {
  return (
    <header className="app-header bg-lime-200 text-3xl border border-blue-900 font-bold text-gray-700 py-6 px-4 text-center max-w-4xl mx-auto rounded-sm">
      <h1 className="text-red-500 flex items-center justify-center gap-2">
        <span>🪙</span>Global<span className='text-green-600'>Currency</span>Watch
      </h1>
      <p className="text-xl text-gray-600 font-semibold mt-1">
        Real-time exchange rates powered by Frankfurter Forex API
      </p>
    </header>
  );
};

export default Header;