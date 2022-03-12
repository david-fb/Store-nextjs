import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetDataFromAPI = (API) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(API);
      setData(response.data);
    }
    fetchData();
  }, [API]);

  return data;
};

export default useGetDataFromAPI;
