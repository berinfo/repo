import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllIngredients, getRecipe, getCategories } from "../api/useHttp";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  Snackbar,
  MenuItem,
} from "@mui/material";
const style = {
  recipe: {
    margin: "auto",
    textAlign: "center",
    maxWidth: "500px",
  },
};

const EditRecipe = () => {
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [prepareIngredients, setPrepareIngredients] = useState([]);
  var take = 30;
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRemoved, setIsRemoved] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    categoryId: "1",
    recommSellingPrice: 0,
    recipeIngredients: [],
  });
  const [oneIng, setOneIng] = useState({
    ingredientId: 0,
    quantity: 1,
    unit: "",
  });
  const pickUnits = ["g", "ml", "kg", "l", "pcs"];

  useEffect(() => {
    getRecipe(id)
      .then((res) => {
        setInput({
          name: res.name,
          description: res.description,
          categoryId: res.category.id,
          recipeIngredients: res.recipeIngredients,
          recommSellingPrice: +res.recommSellingPrice,
        });
        setPrepareIngredients(res.recipeIngredients);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllIngredients()
      .then((res) => setIngredients(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCategories(take)
      .then((res) => setCategories(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  async function editRecipe(e) {
    e.preventDefault();
    await axios
      .put(`https://localhost:5001/Recipes/${id}`, input, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/recipes");
        }, 1500);
      })
      .catch((err) => console.log(err.message));
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  let ingredientsPreview = input.recipeIngredients.map((re) => {
    return {
      ...re,
      name: ingredients.filter((id) => id.id === re.ingredientId)[0]?.name,
    };
  });
  function ingredientChangeHandler(e) {
    setOneIng({ ...oneIng, ingredientId: e.target.value });
  }
  function addIngredientToArr() {
    prepareIngredients.push(oneIng);
    setInput({
      ...input,
      recipeIngredients: prepareIngredients,
    });
    setOneIng({
      ingredientId: 1,
      quantity: 1,
      unit: "",
    });
    // console.log("recepti priprema  =>", prepareIngredients);
    // console.log("one ing => ", oneIng);
  }

  return (
    <Box component="form" sx={style.recipe} onSubmit={editRecipe}>
      <Typography>Name:</Typography>
      <TextField
        type="text"
        fullWidth
        value={input.name}
        required
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <Typography>Description:</Typography>
      <TextField
        type="text"
        multiline
        fullWidth
        required
        sx={{ mb: 2 }}
        value={input.description}
        onChange={(e) => setInput({ ...input, description: e.target.value })}
      />
      <Typography>Category:</Typography>
      <TextField
        select
        fullWidth
        onChange={(e) => setInput({ ...input, categoryId: e.target.value })}
        defaultValue="1"
        required
      >
        {categories &&
          categories.map((item, i) => {
            return (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
      </TextField>
      <TextField
        type="number"
        fullWidth
        label="recommended price"
        value={input.recommSellingPrice}
        onChange={(e) =>
          setInput({ ...input, recommSellingPrice: e.target.value })
        }
      />
      <Divider sx={{ mt: 1 }} />
      <Typography>Ingredients:</Typography>
      <TextField
        select
        fullWidth
        label="Ingredient"
        onChange={ingredientChangeHandler}
      >
        {ingredients &&
          ingredients.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id} name={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
      </TextField>
      <TextField
        fullWidth
        required
        type="number"
        value={oneIng.quantity}
        onChange={(e) => setOneIng({ ...oneIng, quantity: e.target.value })}
      />
      <TextField
        label="Unit"
        select
        fullWidth
        onChange={(e) => setOneIng({ ...oneIng, unit: e.target.value })}
      >
        {pickUnits.map((item, i) => {
          return (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </TextField>
      <Button
        onClick={addIngredientToArr}
        disabled={oneIng.unit === "" || oneIng.ingredientId === ""}
      >
        Add ingredient
      </Button>
      {input.recipeIngredients.length > 0 &&
        ingredientsPreview.map((item, i) => (
          <Typography
            key={i}
            onClick={() => {
              ingredientsPreview.splice(i, 1);
              input.recipeIngredients.splice(i, 1);
              setIsRemoved(!isRemoved);
            }}
          >
            {item?.name} - {item.quantity} {item.unit} <DeleteIcon />
          </Typography>
        ))}
      <Divider />
      <Button type="submit">edit</Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </Box>
  );
};

export default EditRecipe;
