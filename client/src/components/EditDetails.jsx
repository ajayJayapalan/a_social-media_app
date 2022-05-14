import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles/";
import EditRoadIcon from "@mui/icons-material/EditRoad";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserDetails } from "./../redux/actions/user-actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "20px !important",
  },
  textField: {
    marginBottom: "20px !important",
  },
}));

const EditDetails = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [userMeta, setUserMeta] = useState({
    bio: "",
    website: "",
    location: "",
  });
  const dispatch = useDispatch();
  const {
    credentials: { bio, website, location },
  } = useSelector((state) => state.user);

  useEffect(() => {
    setUserMeta({
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : "",
    });
  }, [bio, website, location]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setUserMeta((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: userMeta.bio,
      website: userMeta.website,
      location: userMeta.location,
    };
    setUserMeta({
      bio: "",
      website: "",
      location: "",
    });
    handleClose();
    dispatch(editUserDetails(userDetails));
  };
  return (
    <>
      <IconButton
        title="Edit details"
        onClick={handleOpen}
        className={classes.button}
      >
        <EditRoadIcon color="primary" />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <DialogTitle>Edit your details</DialogTitle>
          <form>
            <TextField
              size="small"
              name="bio"
              type="text"
              label="Bio"
              mutliline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={userMeta.bio}
              onChange={handleChange}
              fullWidth
            ></TextField>
            <TextField
              size="small"
              name="website"
              type="text"
              label="website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={userMeta.website}
              onChange={handleChange}
              fullWidth
            ></TextField>
            <TextField
              size="small"
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={userMeta.location}
              onChange={handleChange}
              fullWidth
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;
