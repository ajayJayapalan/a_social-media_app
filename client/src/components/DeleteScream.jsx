import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteScream } from "../redux/actions/data-actions";
import MyButton from "./MyButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DeleteScream = ({ screamId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteThisScream = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };

  return (
    <>
      <MyButton title="Delete Scream" onClick={handleOpen}>
        <DeleteOutlineIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {" "}
            Cancel
          </Button>
          <Button onClick={deleteThisScream} color="primary">
            {" "}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteScream;
