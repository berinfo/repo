import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";

const style = {
  recipesContainer: {
    margin: "10% auto",
    textAlign: "center",
  },
  categoryHeading: {
    fontSize: "25px",
  },
  recipesHeading: {
    fontSize: "20px",
  },
  recipes: {},
  error: {
    textAlign: "center",
    fontSize: "30px",
  },
  recipesList: {
    textAlign: "center",
    margin: "auto",
    maxWidth: "500px",
  },
};

const Recipes = () => {
  const [recipeView, setRecipeView] = useState(true);
  const [input, setInput] = useState("");
  const token = sessionStorage.getItem("token");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [take, setTake] = useState(10);

  useEffect(() => {
    getRecipes();
    return () => setRecipeView(true);
    // eslint-disable-next-line
  }, [take]);

  async function getRecipes() {
    await axios
      .get(`https://localhost:5001/Recipes/GetAll?skip=0&pageSize=${take}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }
  async function searchRecipe(e) {
    setInput(e.target.value);
    if (input.length > 1) {
      await axios
        .get(`https://localhost:5001/Recipes/Search?word=${input}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setRecipes(res.data.data);
        })
        .catch((err) => console.log(err));
    } else {
      getRecipes();
    }
  }
  if (error) {
    return (
      <>
        <Button onClick={() => navigate("/categories")}>Back</Button>
        <Typography sx={style.error}>No recipes</Typography>
      </>
    );
  }
  if (!recipes) return <Typography>Loading...</Typography>;
  return (
    <Box sx={style.recipesContainer}>
      <TextField
        fullWidth
        type="text"
        value={input}
        onChange={searchRecipe}
        label="Search..."
      />
      <Box sx={style.recipes}>
        <Typography sx={style.recipesHeading}>Recipes:</Typography>
        <List sx={style.recipesList}>
          {recipes?.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => navigate(`/recipes/${item.id}`)}
            >
              {item?.name} || {item?.totalCost.toFixed(2)}$
            </ListItem>
          ))}
        </List>
        <Button onClick={() => setTake(take + 5)}>Load more</Button>
      </Box>
    </Box>
  );
};

export default Recipes;
