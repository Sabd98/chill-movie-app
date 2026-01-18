import { useCallback, useEffect, useState } from "react";

export function useFetch(fetcher, initialData = []) {
  const [fetchedData, setFetchedData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    
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
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchedData, loading, error, fetchData };
}