import { useEffect, useState } from "react";

const useFetch = (url: RequestInfo) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);
    async function getResponse() {
      try {
        const response = await fetch(url);
        const JSONResponse = await response.json();
        setLoading(false);
        setResponse(JSONResponse);
      } catch (error) {
        setLoading(false);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getResponse();
  }, []);

  return [response, loading, error];
};

export default useFetch;
