import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import useFetch from '../hooks/useFetch';
import { API_ENDPOINTS } from '../services/frankfurterApi';

const CurrencyDropdown = () => {
  // Consume baseCurrency state and setBaseCurrency handler from CurrencyContext
  const { baseCurrency, setBaseCurrency } = useCurrency();

  // Fetch supported currencies list
  const { data: currencies, loading, error, refetch } = useFetch(
    API_ENDPOINTS.currencies
  );

  const handleChange = (e) => {
    const selectedCode = e.target.value.trim().toUpperCase();
    if (selectedCode && selectedCode !== baseCurrency) {
      setBaseCurrency(selectedCode);
    }
  };

  if (loading) {
    return (
      <div className="currency-dropdown-container w-full max-w-full px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <label htmlFor="base-currency-select">Base Currency:</label>
        <select id="base-currency-select" disabled className="w-full sm:w-auto p-2 border rounded">
          <option>Loading currencies...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div className="currency-dropdown-container error w-full max-w-full px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>Failed to load currency list.</span>
        <button type="button" onClick={refetch} className="px-3 py-1 bg-red-500 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  // Extract entries and ensure keys are clean 3-letter currency codes
  const currencyOptions = currencies ? Object.entries(currencies) : [];

  return (
    <div className="text-blue-500 text-lg sm:text-xl font-bold currency-dropdown-container w-full max-w-full px-4 flex flex-col sm:flex-row items-center justify-center gap-2 box-border">
      <label htmlFor="base-currency-select" className="whitespace-nowrap">
        Base Currency:{' '}
      </label>
      <select
        id="base-currency-select"
        value={baseCurrency}
        onChange={handleChange}
        className="currency-select w-64 min-w-[200px] max-w-full truncate bg-lime-100 border border-black  rounded-md p-2 text-base text-emerald-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {currencyOptions.map(([key, value]) => {
          // Extract the exact ISO currency code safely
          const code = (
            typeof value === 'object' && value !== null
              ? value.iso_code || key
              : key
          ).trim().toUpperCase();

          // Extract string name if value is an object (v2) or string directly (v1)
          const currencyName =
            typeof value === 'object' && value !== null
              ? value.name || code
              : value;

          return (
            <option key={code} value={code}>
              {code} - {currencyName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyDropdown;