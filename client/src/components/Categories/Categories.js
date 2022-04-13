import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { japActions } from "../../store";
import jwt_decode from "jwt-decode";
import { Box, Typography } from "@mui/material";

import ListComponent from "../ListComponent";
import { useHttp } from "../api/useHttp";

const style = {
  heading: { textAlign: "center", fontSize: "25px" },
};

const Categories = () => {
  const categories = useSelector((state) => state.states.categories);
  const dispatch = useDispatch();
  const [take, setTake] = useState(5);
  // const [data, setData] = useState([]);

  const token = sessionStorage.getItem("token");
  var decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  if (decodedToken) dispatch(japActions.setAdmin(decodedToken.role));

  const { error, loading } = useHttp(
    `https://localhost:5001/Categories?n=${take}`
  );

  // useEffect(() => {
  //   getCategories(take).then((res) => {
  //     setData(res);
  //   });
  // }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  function onTake() {
    setTake((take) => take + 5);
  }
  return (
    <Box>
      <Typography sx={style.heading}>Latest categories:</Typography>
      <ListComponent categories={categories} onTake={onTake} take={take} />
    </Box>
  );
};

export default Categories;
