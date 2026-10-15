// src/components/CurrencyGrid.jsx

import React, { useState, useMemo } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import useFetch from '../hooks/useFetch';
import useFavorites from '../hooks/useFavorites';
import { API_ENDPOINTS } from '../services/frankfurterApi';
import CurrencyCard from './CurrencyCard';
import SearchBar from './SearchBar';
import FeedbackState from './FeedbackState';

const CurrencyGrid = () => {
  const { baseCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data, loading, error, refetch } = useFetch(
    API_ENDPOINTS.getLatestRates(baseCurrency)
  );

  const ratesList = useMemo(() => {
    if (!data) return [];

    let rawEntries = [];
    if (Array.isArray(data)) {
      rawEntries = data.map((item) => [
        item.quote || item.iso_code,
        typeof item.rate === 'object' ? item.rate.value : item.rate,
      ]);
    } else if (data.rates) {
      rawEntries = Object.entries(data.rates).map(([code, val]) => [
        code,
        typeof val === 'object' && val !== null ? val.rate || val.value : val,
      ]);
    } else {
      rawEntries = Object.entries(data).map(([code, val]) => [
        code,
        typeof val === 'object' && val !== null ? val.rate || val.value : val,
      ]);
    }

    // Filter out equal base currency comparisons to prevent 1:1 redundancy
    return rawEntries.filter(([code]) => code !== baseCurrency);
  }, [data, baseCurrency]);

  const filteredAndSortedRates = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    const filtered = ratesList.filter(([code]) =>
      code.toLowerCase().includes(cleanSearch)
    );

    return filtered.sort(([codeA], [codeB]) => {
      const favA = isFavorite(codeA);
      const favB = isFavorite(codeB);
      if (favA && !favB) return -1;
      if (!favA && favB) return 1;
      return codeA.localeCompare(codeB);
    });
  }, [ratesList, searchTerm, isFavorite]);

  if (loading) {
    return <FeedbackState type="loading" message={`Fetching exchange rates for ${baseCurrency}...`} />;
  }

  if (error) {
    return <FeedbackState type="error" message={error} onRetry={refetch} />;
  }

  return (
    <section className="space-y-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredAndSortedRates.length === 0 ? (
        <FeedbackState type="empty" message={`No currencies found matching "${searchTerm}"`} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAndSortedRates.map(([code, rate]) => (
            <CurrencyCard
              key={code}
              code={code}
              rate={rate}
              isFavorite={isFavorite(code)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CurrencyGrid;