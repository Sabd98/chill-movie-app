import apiClient from "../api/client";
import { useCallback, useEffect, useState } from "react";

export function useFetch(apiUrl) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.get(apiUrl);
      setFetchedData(response.data);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchedData, loading, error, fetchData };
}