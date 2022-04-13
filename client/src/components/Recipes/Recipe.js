import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Modal,
  Button,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { japActions } from "../../store";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  recipe: {
    margin: "auto",
    textAlign: "center",
    maxWidth: "500px",
  },
  recipeHeading: {
    fontSize: "25px",
  },
  modal: {
    position: "absolute",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};

const Recipe = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.states.isAdmin);
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.states.recipe);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDetails(id);
    // eslint-disable-next-line
  }, []);

  const getDetails = async (rId) => {
    axios
      .get(`https://localhost:5001/Recipes/${rId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(japActions.setRecipe(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function deleteRecipe(id) {
    axios
      .delete(`https://localhost:5001/Recipes/${id}`)
      .then((res) => {
        setOpen(false);
        setOpenSnackbar(true);
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/recipes");
        }, 1200);
      })
      .catch((err) => console.log(err.message));
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (!recipe) return null;
  return (
    <Box sx={style.recipe}>
      <Typography>Recipe name:</Typography>
      <Typography sx={style.recipeHeading}>{recipe?.name}</Typography>
      <Divider></Divider>
      <Box>
        <Typography>Description:</Typography>
        <Typography sx={style.recipeHeading}>{recipe?.description}</Typography>
        <Divider></Divider>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography>Ingredients:</Typography>
        {recipe.recipeIngredients &&
          recipe.recipeIngredients.map((item, i) => {
            return (
              <Typography key={item.quantity + i} sx={style.recipeHeading}>
                {item.ingredient.name} {item.quantity} {item.unit}
              </Typography>
            );
          })}
      </Box>
      <Divider />
      <Typography sx={style.recipeHeading}>
        Total:{recipe?.price?.toFixed(2)}$
      </Typography>
      {isAdmin && (
        <Typography sx={style.recipeHeading}>
          Selling price:{recipe?.recommSellingPrice?.toFixed(2)}$
        </Typography>
      )}
      {isAdmin && <EditIcon onClick={() => navigate(`/recipes/edit/${id}`)} />}
      {isAdmin && <DeleteIcon onClick={handleOpen} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete this item
          </Typography>
          <Button onClick={() => deleteRecipe(id)}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </Box>
  );
};

export default Recipe;
