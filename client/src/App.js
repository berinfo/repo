import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Login from "./components/Login";
import Categories from "./components/Categories/Categories";
import ViewCategory from "./components/Categories/ViewCategory";
import AddCategory from "./components/Categories/AddCategory";
import EditCategory from "./components/Categories/EditCategory";
import Ingredients from "./components/Ingredients/Ingredients";
import AddIngredient from "./components/Ingredients/AddIngredient";
import EditIngredient from "./components/Ingredients/EditIngredient";
import Recipes from "./components/Recipes/Recipes";
import Recipe from "./components/Recipes/Recipe";
import AddRecipe from "./components/Recipes/AddRecipe";
import EditRecipe from "./components/Recipes/EditRecipe";
import PrivateRoute from "./components/Auth/PrivateRoute";
const style = {
  app: {
    minHeight: "100vh",
    overflow: "auto",
  },
};

function App() {
  return (
    <Box className="app" sx={style.app}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<ViewCategory />} />
          <Route
            path="/categories/add"
            element={
              <PrivateRoute>
                <AddCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/edit/:id"
            element={
              <PrivateRoute>
                <EditCategory />
              </PrivateRoute>
            }
          />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route
            path="ingredients/add"
            element={
              <PrivateRoute>
                <AddIngredient />
              </PrivateRoute>
            }
          />
          <Route
            path="ingredients/:id"
            element={
              <PrivateRoute>
                <EditIngredient />
              </PrivateRoute>
            }
          />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/recipes/edit/:id"
            element={
              <PrivateRoute>
                <EditRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes/:id"
            element={
              <PrivateRoute>
                <Recipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/addrecipe"
            element={
              <PrivateRoute>
                <AddRecipe />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
