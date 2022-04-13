import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllIngredients, getCategories, postRecipe } from "../api/useHttp";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Divider,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  container: {
    maxWidth: "500px",
    margin: "5% auto",
  },
  submitBtn: {},
};

const AddRecipe = () => {
  const take = 30;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [prepareIngredients, setPrepareIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    categoryId: "1",
    recommSellingPrice: 0,
    recipeIngredients: [],
  });
  const [isRemoved, setIsRemoved] = useState(false);
  const [oneIng, setOneIng] = useState({
    ingredientId: 0,
    quantity: 1,
    unit: "",
  });

  const pickUnits = ["g", "ml", "kg", "l", "pcs"];

  useEffect(() => {
    getAllIngredients()
      .then((res) => setIngredients(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCategories(take)
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  async function create(e) {
    e.preventDefault();
    postRecipe(input)
      .then((res) => {
        setMessage(res.message);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      })
      .catch((err) => console.log(err.message));
  }

  function onChangeCategory(e) {
    setInput({ ...input, categoryId: e.target.value });
  }
  function onChangeName(e) {
    setInput({ ...input, name: e.target.value });
  }
  function onChangeIngUnit(e) {
    setOneIng({ ...oneIng, unit: e.target.value });
  }

  function addIngredientToArr() {
    prepareIngredients.push(oneIng);
    setInput({ ...input, recipeIngredients: prepareIngredients });
  }

  function ingredientChangeHandler(e) {
    setOneIng({ ...oneIng, ingredientId: e.target.value });
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
      name: ingredients.filter((id) => id.id === re.ingredientId)[0].name,
    };
  });
  const onlyPositive = (e) => {
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();
  };
  return (
    <Box sx={style.container} component="form" onSubmit={create}>
      <Typography>Name:</Typography>
      <TextField
        type="text"
        fullWidth
        value={input.name}
        required
        onChange={onChangeName}
      />
      <Typography>Category:</Typography>
      <TextField
        select
        fullWidth
        onChange={onChangeCategory}
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
      <Typography>Description:</Typography>
      <TextField
        type="text"
        multiline
        fullWidth
        required
        value={input.description}
        onChange={(e) => setInput({ ...input, description: e.target.value })}
      />
      <Divider sx={{ mt: 1 }} />
      <Typography>Add ingredients</Typography>
      <TextField
        select
        fullWidth
        required
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
      <TextField label="Unit" select fullWidth onChange={onChangeIngUnit}>
        {pickUnits.map((item, i) => {
          return (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        type="number"
        label="recommended price"
        value={input.recommSellingPrice}
        fullWidth
        sx={{ mt: 2 }}
        onKeyDown={onlyPositive}
        onChange={(e) =>
          setInput({ ...input, recommSellingPrice: e.target.value })
        }
      />
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
            {item.name} - {item.quantity} {item.unit} <DeleteIcon />
          </Typography>
        ))}
      {input.recipeIngredients.length > 0 && (
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 4 }}>
          Create recipe
        </Button>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </Box>
  );
};

export default AddRecipe;
