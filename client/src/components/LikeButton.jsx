import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { likeScream, unlikeScream } from "../redux/actions/data-actions";

const LikeButton = ({ id }) => {
  const { authenticated, likes } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === id)) return true;
    else return false;
  };
  const likeThisScream = () => {
    dispatch(likeScream(id));
  };
  const unlikeThisScream = () => {
    dispatch(unlikeScream(id));
  };

  return !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeThisScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeThisScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

export default LikeButton;
