import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHandler(res.data.token, res.data.refreshToken);
      dispatch(getUserData());
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((e) => {
      console.log("error 👉", e);
      const err = {
        email: e.response?.data?.error?.email,
        password: e.response?.data?.error?.password,
        general: e.response?.data?.general,
      };
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signup", userData)
    .then((res) => {
      setAuthorizationHandler(res.data.token, res.data.refreshToken);
      dispatch(getUserData());
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((e) => {
      const err = {
        email: e.response.data.error?.email,
        password: e.response.data.error?.password,
        confirmPassword: e.response.data.error?.confirmPassword,
        username: e.response.data.error?.handle,
        general: e.response.data?.general,
      };
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then((res) => dispatch(getUserData()))
    .catch((err) => console.log(err));
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get("/user").then((res) => {
    return dispatch({
      type: SET_USER,
      payload: res.data,
    });
  });
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("FBRefreshIdToken");
  delete axios.defaults.headers.common["Authorization"];
  return dispatch({ type: SET_UNAUTHENTICATED });
};

export const refreshMyToken = (token) => {
  if (token) {
    const options = {
      method: "GET",
      headers: { refreshToken: token },
      url: "/refresh",
    };
    axios(options).then((res) => {
      setAuthorizationHandler(res.data.access_token, res.data.refresh_token);
    });
  }
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHandler = (token, refreshToken) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  localStorage.setItem("FBRefreshIdToken", refreshToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

