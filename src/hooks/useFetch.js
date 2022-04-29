import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
      } catch (error) {
        if (error?.message !== 'canceled') {
          setError(error);
        }
      }
    }
    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, error };
};

export default useFetch;
