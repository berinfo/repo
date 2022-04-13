import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory } from "../api/useHttp";
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

const EditCategory = () => {
  const token = sessionStorage.getItem("token");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const categoryName = useSelector((state) =>
    id ? state.states.categories.find((c) => c.id === +id) : null
  );
  useEffect(() => {
    if (categoryName) setName(categoryName.name);
    // eslint-disable-next-line
  }, []);
  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  async function editCategoryContent(id, data) {
    editCategory(id, data)
      .then((res) => {
        setMessage(res.message);
        handleClick();
        setTimeout(() => {
          navigate("/categories");
        }, 1500);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <Box sx={style.addCategoryContainer}>
      <Button onClick={() => navigate(-1)}>back</Button>
      <Typography>Edit category</Typography>
      <Divider />
      <Box
        sx={style.addBox}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          editCategoryContent(id, { name });
        }}
      >
        <Typography>Name</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit">submit</Button>
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

export default EditCategory;
