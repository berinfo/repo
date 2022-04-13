import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const style = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    padding: "5px 5px",
    textAlign: "center",
    margin: "10% auto",
    height: "100vh",
  },
  btn: {
    variant: "contained",
    //    color: "white",
    //   backgroundColor: "indigo",
    marginTop: "20px",
  },
  error: {
    color: "red",
  },
};

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginHandler();
  };
  const loginHandler = async () => {
    await axios
      .post("https://localhost:5001/Auth/Login", input)
      .then((res) => {
        setError("");
        sessionStorage.setItem("token", res.data.data);
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <Box component="form" onSubmit={submitHandler} sx={style.form}>
      <Typography>Username:</Typography>
      <TextField
        required
        type="text"
        name="username"
        value={input.username}
        onChange={changeHandler}
      />
      <Typography>Password:</Typography>
      <TextField
        required
        type="password"
        name="password"
        value={input.password}
        onChange={changeHandler}
      />
      <Typography sx={style.error}>{error}</Typography>
      <Button sx={style.btn} type="submit">
        Login
      </Button>
    </Box>
  );
};

export default Login;
