import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endPoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(endPoint);
      setData(response.data);
    }
    fetchData();
  }, [endPoint]);

  return data;
};

export default useFetch;
