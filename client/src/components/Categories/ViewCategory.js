import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Divider,
  Modal,
  Button,
  Snackbar,
  List,
  ListItem,
} from "@mui/material";
import { getCategory, deleteCategory } from "../api/useHttp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const style = {
  categoryContainer: {
    margin: "10% auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "35px",
  },
  categoryName: {
    fontSize: "25px",
  },
  iconsGroup: {
    marginTop: "50px",
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
  lisOfRecipes: {
    margin: "auto",
    width: "500px",
  },
};
const ViewCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const isAdmin = useSelector((state) => state.states.isAdmin);
  const categoryName = useSelector((state) =>
    id ? state.states.categories.find((c) => c.id === +id) : null
  );

  useEffect(() => {
    getCategory(id)
      .then((res) => setRecipes(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  function handleDelete(id) {
    deleteCategory(id)
      .then((res) => {
        handleClose();
        handleClick();
        setMessage(res.message);
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const recipeList = (
    <List sx={style.lisOfRecipes}>
      {recipes && recipes.length > 0 ? (
        recipes.map((item) => {
          return (
            <ListItem key={item.id}>
              {item.name} || {item.totalCost.toFixed(2)}
            </ListItem>
          );
        })
      ) : (
        <Typography>No recipes in category.</Typography>
      )}
    </List>
  );
  return (
    <>
      <Box sx={style.categoryContainer}>
        <Typography sx={style.heading}>Categories</Typography>
        <Divider />
        <Typography sx={style.categoryName}>Name:</Typography>
        <Typography>{categoryName?.name}</Typography>
        {recipes && recipeList}
        {isAdmin && (
          <Box sx={style.iconsGroup}>
            <AddCircleIcon onClick={() => navigate("/categories/add")} />
            <EditIcon onClick={() => navigate(`/categories/edit/${id}`)} />
            <DeleteIcon onClick={handleOpen} />
          </Box>
        )}
      </Box>
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
          <Button onClick={() => handleDelete(id)}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </>
  );
};

export default ViewCategory;
