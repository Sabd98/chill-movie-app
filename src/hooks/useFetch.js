import apiClient from "../api/client";
import { useCallback, useEffect, useState } from "react";

export function useFetch(apiUrl) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      if (typeof apiUrl === "function") {
        data = await apiUrl();
      } else {
        const response = await apiClient.get(apiUrl);
        data = response.data;
      }
      setFetchedData(data);
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