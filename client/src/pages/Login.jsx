import React, { useState } from "react";
import icon from "../assets/images/monkey.png";
import { BeatLoader } from "react-spinners";

// MUI
import { makeStyles } from "@mui/styles/";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/user-actions";
import { SET_ERRORS } from "./../redux/types";

const useStyles = makeStyles({
  form: {
    textAlign: "center",
  },
  img: {
    height: 70,
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
});

function Login() {
  const [email, setEmail] = useState("user@somemail.com");
  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();
  const {
    UI: { errors, loading },
  } = useSelector((state) => state);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData, history));
  };

  const handleChange = (setState, value) => {
    dispatch({
      type: SET_ERRORS,
      payload: null,
    });
    setState(value);
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img className={classes.img} src={icon} alt="a monkey " />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <p style={{ color: "red" }}>{errors?.general && errors.general}</p>
          <TextField
            helperText={errors?.email}
            error={!!errors?.email}
            fullWidth
            size="small"
            sx={{ marginTop: 3 }}
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => {
              handleChange(setEmail, e.target.value);
            }}
          />
          <TextField
            helperText={errors?.password}
            error={!!errors?.password}
            fullWidth
            size="small"
            sx={{ marginTop: 3 }}
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => {
              handleChange(setPassword, e.target.value);
            }}
          />
          <Button
            sx={{ marginTop: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading && (
              <BeatLoader size={10} color="white" loading={loading} />
            )}
            {!loading && <>Login</>}
          </Button>
        </form>
        <small>
          Don't have an account ? Signup <Link to="/singup">here</Link>
        </small>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Login;
