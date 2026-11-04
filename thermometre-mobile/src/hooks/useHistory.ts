import {useCallback, useEffect, useState} from "react";
import {api} from "@/services/api/client";
import type {Measurement, MeasurementHistoryResponse} from "@/types/measurement";

export function useHistory()
{
    const [ history, setHistory ] = useState<MeasurementHistoryResponse>();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    const refresh = useCallback(async () =>
    {
        setLoading(true);
        setError(null);
        try
        {
            const data = await api.getMeasurementHistory<MeasurementHistoryResponse>();
            setHistory(data);
        } catch (err)
        {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally
        {
            setLoading(false);
        }
    }, []);

    useEffect(() => {void refresh();}, [ refresh ]);

    return {history, loading, error, refresh};
}