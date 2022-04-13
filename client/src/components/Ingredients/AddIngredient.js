import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Snackbar } from "@mui/material";

const style = {
  container: {
    maxWidth: "500px",
    margin: " 50px auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  submitBtn: {},
  unitInput: {
    height: "50px",
  },
};

const AddIngredient = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const token = sessionStorage.getItem("token");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    purchaseQuantity: "",
    purchasePrice: "",
    purchaseUnit: "g",
  });
  const units = ["g", "ml", "kg", "l", "pcs"];

  async function addIngredient(e) {
    e.preventDefault();
    await axios
      .post(`https://localhost:5001/Ingredients`, input, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/ingredients");
        }, 1500);
      })
      .catch((err) => console.log(err.message));
  }
  function onChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const onlyPositive = (e) => {
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
  };
  return (
    <Box component="form" onSubmit={addIngredient} sx={style.container}>
      <Typography>Name</Typography>
      <TextField value={input.name} name="name" onChange={onChange} required />
      <Typography>Quantity</Typography>
      <TextField
        value={input.purchaseQuantity}
        onKeyDown={onlyPositive}
        name="purchaseQuantity"
        onChange={onChange}
        required
      />
      <Typography>Price</Typography>
      <TextField
        value={input.purchasePrice}
        name="purchasePrice"
        onChange={onChange}
        onKeyDown={onlyPositive}
        required
      />
      <Typography>Unit</Typography>
      <select
        style={style.unitInput}
        required
        value={input.purchaseUnit}
        name="purchaseUnit"
        onChange={onChange}
      >
        {units.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <Button type="submit">add</Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </Box>
  );
};

export default AddIngredient;
