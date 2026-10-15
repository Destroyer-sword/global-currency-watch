import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'currency_favorites';

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to parse favorites from localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((currencyCode) => {
    setFavorites((prev) =>
      prev.includes(currencyCode)
        ? prev.filter((code) => code !== currencyCode)
        : [...prev, currencyCode]
    );
  }, []);

  const isFavorite = useCallback(
    (currencyCode) => favorites.includes(currencyCode),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;