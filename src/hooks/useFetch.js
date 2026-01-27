import { useCallback, useEffect, useState } from "react";

export function useFetch(fetcher, initialData = [], options = {}) {
  const { enabled = true } = options;
  const [fetchedData, setFetchedData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetcher();
      setFetchedData(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetcher, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 
  useEffect(() => {
    if (!enabled) {
      setFetchedData(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { fetchedData, loading, error, fetchData };
}