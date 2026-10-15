import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for asynchronous data fetching
 * @param {string} url - API endpoint to fetch
 * @param {object} options - Fetch options (headers, method, etc.)
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  // Store options in a ref to avoid infinite re-render loops if options object is recreated on renders
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchData = useCallback(async () => {
    // Skip execution if URL is empty or null
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...optionsRef.current,
        signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      // Ignore errors triggered by aborting the request on unmount/re-fetch
      if (err.name !== 'AbortError') {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      // Only set loading to false if the request was not aborted
      if (!signal.aborted) {
        setLoading(false);
      }
    }

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const cancelFetch = fetchData();

    return () => {
      // Cleanup: Abort pending HTTP requests on component unmount or URL change
      if (typeof cancelFetch === 'function') {
        cancelFetch();
      }
    };
  }, [fetchData]);

  // Refetch function to manually re-trigger the API request
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;