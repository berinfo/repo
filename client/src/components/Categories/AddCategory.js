import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postCategory } from "../api/useHttp";
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";

const style = {
  addCategoryContainer: {
    margin: "10% auto",
    textAlign: "center",
  },
  addBox: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "auto",
    mt: 5,
  },
};

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  async function addCategory(data) {
    postCategory(data)
      .then((res) => {
        setMessage(res.message);
        handleClick();
        setTimeout(() => {
          navigate("/categories");
        }, 1500);
      })
      .catch((err) => console.log(err.message));
    console.log(name);
  }
  return (
    <Box sx={style.addCategoryContainer}>
      <Button onClick={() => navigate(-1)}>back</Button>
      <Typography>Add new category</Typography>
      <Divider />
      <Box sx={style.addBox}>
        <Typography>Name</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button onClick={() => addCategory({ name })}>add</Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </Box>
  );
};

export default AddCategory;
