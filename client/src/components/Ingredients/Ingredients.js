import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Modal,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import { getIngredients, deleteIngredient } from "../api/useHttp";
const style = {
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
const Ingredients = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [idToDelete, setIdToDelete] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [filter, setFilter] = useState({
    skip: 0,
    pageSize: 5,
    sortOrder: "ASC",
    sortBy: "",
    name: "",
    minQuant: "",
    maxQuant: "",
    //unitEnum: "",
  });

  const isAdmin = useSelector((state) => state.states.isAdmin);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const pageSizes = [5, 10, 15, 25, 50, 100];
  const sortTypes = ["ASC", "DESC"];
  const units = ["g", "ml", "kg", "l", "pcs"];

  useEffect(() => {
    getIngredients(filter)
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  function filterData(par) {
    getIngredients(par).then((res) => {
      setIngredients(res);
    });
  }

  async function handleDelete(id) {
    deleteIngredient(id)
      .then((res) => {
        setOpenSnackbar(true);
        setOpen(false);
        setMessage(res.message);
        getIngredients(filter).then((res) => setIngredients(res));
      })
      .catch((err) => console.log(err));
  }
  function changePageSize(e) {
    setFilter({ ...filter, skip: 0, pageSize: e.target.value });
  }
  function changeSortOrder(e) {
    setFilter({ ...filter, sortOrder: e.target.value });
  }
  function changeNameFilter(e) {
    setFilter({ ...filter, name: e.target.value });
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <select value={filter.pageSize} onChange={changePageSize}>
          {pageSizes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={filter.sortOrder} onChange={changeSortOrder}>
          {sortTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <input
          value={filter.name}
          onChange={changeNameFilter}
          placeholder="By name"
        />
        <select value={filter.unit}>
          {units.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <input
          value={filter.minQuant}
          onChange={(e) => setFilter({ ...filter, minQuant: e.target.value })}
          placeholder="min quantity"
        />
        <input
          value={filter.maxQuant}
          onChange={(e) => setFilter({ ...filter, maxQuant: e.target.value })}
          placeholder="max quantity"
        />
        <Button onClick={() => filterData(filter)}>filter</Button>
        {isAdmin && (
          <Button onClick={() => navigate("/ingredients/add")}>
            <AddCircleIcon /> add
          </Button>
        )}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Measure</TableCell>
            {isAdmin && <TableCell>Options</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.purchaseQuantity}</TableCell>
                <TableCell>{item.purchasePrice}</TableCell>
                <TableCell>{item.purchaseUnit}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <EditIcon
                      onClick={() => navigate(`/ingredients/${item.id}`)}
                    />
                    <DeleteIcon
                      onClick={() => {
                        setIdToDelete(item.id);
                        handleOpen();
                      }}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
          <Button
            onClick={() => {
              idToDelete && handleDelete(idToDelete);
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </>
  );
};

export default Ingredients;
