import jwtDecode from "jwt-decode";
import { SET_UNAUTHENTICATED } from "../redux/types";
import { SET_AUTHENTICATED } from "./../redux/types";
import axios from "axios";
import { getUserData, userLogout } from "./../redux/actions/user-actions";

export const getToken = () => {
  return localStorage?.FBIdToken;
};
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

export function getTime(createdAt, relative = true) {
  const dayjs = require("dayjs");
  const relativeTime = require("dayjs/plugin/relativeTime");
  const { _seconds: sec, _nanoseconds: nano } = createdAt;
  if (relative) {
    dayjs.extend(relativeTime);
    const date = new Date(sec * 1000 + nano / 1000000);
    return dayjs(date).fromNow();
  } else {
    const date = new Date(sec * 1000 + nano / 1000000);
    return dayjs(date).format("h:mm a, MMMM DD YYYY");
  }
}

export const checkTokenValid = (token, dispatch) => {
  const isTokenStringUndefined = token?.split(" ")[1] === "undefined";
  if (!token || isTokenStringUndefined) {
    dispatch(userLogout());
    return;
  }
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken * 1000 < Date.now()) {
      console.log("that's why...");
      dispatch({
        type: SET_UNAUTHENTICATED,
      });
      window.location.href = "/login";
    } else {
      dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getUserData());
    }
  }
};
