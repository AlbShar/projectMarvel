import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');
    
    const request = useCallback(async (url, method = "GET", body = null, headers = {'Content-type': "application/json"}) => {
        try {
            setLoading(true);
            setProcess('loading');
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setProcess('error');
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading');
        setError(null);
    }, []);

    return {error, loading, request, clearError, process, setProcess}
};

export default useHttp;