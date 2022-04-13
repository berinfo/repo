import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { japActions } from "../../store";
const token = sessionStorage.getItem("token");
const headers = { Authorization: `bearer ${token}` };

export const useHttp = (url) => {
  const token = sessionStorage.getItem("token");
  const headers = { Authorization: `bearer ${token}` };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        setData(res?.data?.data);
        dispatch(japActions.setCategories(res?.data?.data));
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return {
    data,
    loading,
    error,
  };
};

export const getCategories = async (n) => {
  const res = await axios.get(`https://localhost:5001/Categories?n=${n}`);
  return res?.data?.data;
};

export const postCategory = async (data) => {
  const res = await axios.post(`https://localhost:5001/Categories`, data);
  return res?.data;
};

export const getCategory = async (id) => {
  const res = await axios.get(
    `https://localhost:5001/Recipes/GetByCategory?categoryId=${id}&skip=0&pageSize=5`
  );
  return res?.data?.data;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`https://localhost:5001/Categories/${id}`);
  return res?.data;
};

export const editCategory = async (id, data) => {
  const res = await axios.put(`https://localhost:5001/Categories/${id}`, data);
  return res?.data;
};

export const getIngredients = async (par) => {
  const res = await axios.get("https://localhost:5001/Ingredients", {
    params: par,
  });
  return res?.data?.data;
};

export const getAllIngredients = async () => {
  const res = await axios.get("https://localhost:5001/Ingredients/getAll");

  return res?.data?.data;
};

export const getIngredient = async (id) => {
  const res = await axios.get(`https://localhost:5001/Ingredients/${id}`);
  return res?.data?.data;
};

export const deleteIngredient = async (id) => {
  const res = await axios.delete(`https://localhost:5001/Ingredients/${id}`);
  return res?.data;
};

export const editIngredient = async (id, data) => {
  const res = await axios.put(`https://localhost:5001/Ingredients/${id}`, data);
  return res?.data;
};

export const postRecipe = async (data) => {
  const res = await axios.post("https://localhost:5001/Recipes", data);
  return res?.data;
};

export const getRecipe = async (id) => {
  const res = await axios.get(`https://localhost:5001/Recipes/${id}`);
  return res?.data?.data;
};
