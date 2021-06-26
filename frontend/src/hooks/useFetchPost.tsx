import { useEffect, useState } from "react";

const useFetchPost = (url: RequestInfo, data: Object, method: string) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);
    async function getResponse() {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
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

export default useFetchPost;
