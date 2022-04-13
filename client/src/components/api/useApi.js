import { useEffect, useState } from "react";
import axios from "axios";

export const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function api(request) {
    await axios({
      method: request.method,
      url: request.path,
      data: request.data || null,
      headers: request.headers || {},
    })
      .then((response) => {
        setLoading(false);
        setError(null);
        setData(response.data);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  return { api, data, error, loading };
};
