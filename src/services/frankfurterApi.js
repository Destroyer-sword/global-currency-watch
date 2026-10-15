// src/services/frankfurterApi.js

export const API_BASE_URL = 'https://api.frankfurter.dev/v2';

export const API_ENDPOINTS = {
  currencies: `${API_BASE_URL}/currencies`,
  getLatestRates: (baseCurrency = 'USD') => {
    // Sanitize base currency code
    const cleanBase = String(baseCurrency).trim().toUpperCase();
    return `${API_BASE_URL}/rates?base=${cleanBase}`;
  },
};

/**
 * Service function to fetch latest exchange rates for a given base currency
 */
export const fetchLatestRates = async (baseCurrency = 'USD', signal) => {
  const response = await fetch(API_ENDPOINTS.getLatestRates(baseCurrency), { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch rates for base currency ${baseCurrency}`);
  }
  return response.json();
};