import { useCallback, useEffect, useState } from "react";
import { api } from "@/services/api/client";
import type { Measurement } from "@/types/measurement"; 

export function useLatestMeasurement() {
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getLatestMeasurement<Measurement>();
      setMeasurement(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  return { measurement, loading, error, refresh };
}
