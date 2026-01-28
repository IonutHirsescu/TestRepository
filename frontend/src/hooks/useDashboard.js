import { useState, useEffect } from "react";
import { getDashboard, getPortfolio } from "../services/api";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await getDashboard();
        if (!cancelled) {
          setData(res.data.data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load dashboard");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { dashboardData: data, loading, error };
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPortfolio()
      .then((res) => {
        setPortfolio(res.data.data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load portfolio"))
      .finally(() => setLoading(false));
  }, []);

  return { portfolio, loading, error };
}
