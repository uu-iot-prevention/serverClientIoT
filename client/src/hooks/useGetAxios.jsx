import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function useGetAxios(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies] = useCookies(["token"]);

  const token = cookies?.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(url, { headers });

        // console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
}
