import React from "react";
import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./../redux/actions/user-actions";

// MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PostScream from "./PostScream";
import Notification from "./Notification";

const useStyles = makeStyles({
  navContainer: {
    margin: "auto",
  },
});

function Navbar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    user: { authenticated },
  } = useSelector((state) => state);

  return (
    <AppBar position="sticky" sx={{ marginBottom: 2 }}>
      <Toolbar className={classes.navContainer}>
        <MyButton title="Home" color="inherit" component={Link} to="/">
          <HomeIcon />
        </MyButton>
        {/* <MyButton color="inherit" onClick={handleClick} title="Add Scream">
          <AddIcon />
        </MyButton> */}
        <PostScream />
        <Notification />

        {!authenticated && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
        {authenticated && (
          <MyButton
            title="Logout"
            color="inherit"
            component={Link}
            to="/login"
            onClick={() => dispatch(userLogout())}
          >
            <LogoutIcon />
          </MyButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
