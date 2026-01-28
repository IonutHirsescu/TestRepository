import { useState, useEffect, useMemo } from "react";
import { getStocks, getCrypto } from "../services/api";

export const ASSET_FILTER = {
  ALL: "all",
  STOCKS: "stocks",
  CRYPTO: "crypto",
};

export function useAssets() {
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(ASSET_FILTER.ALL);

  useEffect(() => {
    async function loadAssets() {
      try {
        setLoading(true);
        const [stocksRes, cryptoRes] = await Promise.all([
          getStocks(),
          getCrypto(),
        ]);

        // handle different response formats from API
        const stocksData = stocksRes.data.data || stocksRes.data || [];
        const cryptoData = cryptoRes.data.data || cryptoRes.data || [];

        setStocks(stocksData.map((s) => ({ ...s, type: "stock" })));
        setCrypto(cryptoData.map((c) => ({ ...c, type: "crypto" })));
        setError(null);
      } catch (err) {
        console.error("Failed to load assets:", err);
        setError(err.message || "Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    }
    loadAssets();
  }, []);

  const assets = useMemo(() => {
    if (filter === ASSET_FILTER.STOCKS) return stocks;
    if (filter === ASSET_FILTER.CRYPTO) return crypto;
    return [...stocks, ...crypto];
  }, [stocks, crypto, filter]);

  return { assets, stocks, crypto, loading, error, filter, setFilter };
}
