import React from "react";
import { Link } from "react-router-dom";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import Timestamp from "firebase-firestore-timestamp";

// MUI
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions, Typography } from "@mui/material";
import { getTime } from "../utils/utility-functions";
import { useDispatch, useSelector } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/data-actions";

// Icons
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MyButton from "./MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 10,
    marginTop: 10,
  },
  img: {
    maxWidth: 150,
    height: 150,
    objectFit: "cover",
    padding: 0,
  },
});

function Scream({
  userImage,
  openDialog,
  userHandle,
  createdAt,
  body,
  screamId: id,
  likeCount,
  commentCount,
}) {
  const classes = useStyles();

  const {
    likes,
    authenticated,
    credentials: { handle },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isLiked = () => {
    if (likes.find(({ screamId }) => screamId === id)) {
      return true;
    } else {
      return false;
    }
  };

  const likeThisScream = () => {
    dispatch(likeScream(id));
  };

  const unlikeThisScream = () => {
    dispatch(unlikeScream(id));
  };

  const likeButton = !authenticated ? (
    <MyButton>
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </MyButton>
  ) : isLiked() ? (
    <FavoriteIcon color="primary" />
  ) : (
    <FavoriteBorderIcon color="primay" />
  );

  const commentButton = <ChatIcon color="primary" />;

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={id} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.img}
        component="img"
        image={userImage}
        alt="Profile image"
      />
      <div>
        <CardContent>
          <Typography
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
            className={classes.userHandle}
            gutterBottom
            variant="h5"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {createdAt && getTime(createdAt)}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={isLiked() ? unlikeThisScream : likeThisScream}
            startIcon={likeButton}
            size="small"
          >
            {likeCount} Like
          </Button>
          <Button startIcon={commentButton} size="small">
            {commentCount} Comment
          </Button>
          {deleteButton}
          <ScreamDialog
            id={id}
            userHandle={userHandle}
            openDialog={openDialog}
          />
        </CardActions>
      </div>
    </Card>
  );
}

export default Scream;
