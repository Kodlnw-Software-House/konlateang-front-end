import http from "../components/functions/services/auth-header";
import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (axiosParams) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async (params) => {
    try {
      const result = await http.request(params);
      setData(result.data);
    } catch (er) {
      setError(er);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { data, loading, error };
};
