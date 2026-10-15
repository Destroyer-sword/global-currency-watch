import React from 'react';

const CurrencyCard = ({ code, rate, isFavorite, onToggleFavorite }) => {
  return (
    <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg bg-green-400 shadow-green-900 hover:shadow-green-900 border-blue-900 ${
      isFavorite ? 'border-amber-400 ring-1shadow-red-900 ring-amber-400' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg text-red-600">{code}</span>
        <button
          type="button"
          onClick={() => onToggleFavorite(code)}
          className={`text-xl transition-colors ${
            isFavorite ? 'text-amber-500' : 'text-gray-700 hover:text-white'
          }`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <p className="text-2xl font-semibold text-indigo-600">
        {typeof rate === 'number' ? rate.toFixed(4) : rate}
      </p>
    </div>
  );
};

export default CurrencyCard;