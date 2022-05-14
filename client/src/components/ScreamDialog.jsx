import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOneScream } from "../redux/actions/data-actions";
import MyButton from "./MyButton";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { getTime } from "../utils/utility-functions";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const useStyles = makeStyles({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    justifyContent: "flex-end !important",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  invisibleSeparator: {
    visibility: "hidden",
  },
  visibleSeparator: {
    position: "relative",
    zIndex: "10",
    border: "1px solid lightgray",
    margin: 0,
    marginLeft: "150px",
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
  },
});

const ScreamDialog = ({ id, openDialog }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments,
  } = useSelector((state) => state.data.scream);
  const { loading } = useSelector((state) => state.UI);

  // eslint-disable-next-line
  const [newUrl, setNewUrl] = useState("");
  const [oldUrl, setOldUrl] = useState("");

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    setNewUrl(newPath);
    setOldUrl(oldPath);
    setOpen(true);
    dispatch(getOneScream(id));
  };
  const handleClose = () => {
    setOpen(false);
    window.history.pushState(null, null, oldUrl);
    dispatch(clearErrors());
  };

  useEffect(() => {
    console.log("open dialog", openDialog);
    if (openDialog) {
      handleOpen();
    }
    // eslint-disable-next-line
  }, [openDialog]);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {createdAt && getTime(createdAt, false)}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton id={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm id={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      <MyButton onClick={handleOpen} title="Expand scream">
        <UnfoldMoreIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          className={classes.closeButton}
          title="Close"
          onClick={handleClose}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScreamDialog;
