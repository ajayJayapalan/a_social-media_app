import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "./MyButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { clearErrors, postScream } from "../redux/actions/data-actions";

const useStyles = makeStyles({
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    justifyContent: "flex-end !important",
  },
});

const PostScream = () => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const dispatch = useDispatch();
  const { loading, errors: err } = useSelector((state) => state.UI);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
  };

  const handleChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postScream({ body: body }));
  };

  useEffect(() => {
    if (err) {
      setErrors(err);
    }
    if (!err && !loading) {
      setOpen(false);
      setBody("");
      setErrors({});
    }
  }, [err, loading]);

  return (
    <>
      <MyButton onClick={handleOpen} title="Post a Scream!">
        <AddIcon style={{ color: "white" }} />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginTop: 3 }}
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              sx={{ marginTop: 3 }}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostScream;
