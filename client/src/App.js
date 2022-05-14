import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

// MUI
import { makeStyles } from "@mui/styles";
import AuthRoute from "./utils/AuthRoute";
import { checkTokenValid, getToken } from "./utils/utility-functions";
import { useEffect } from "react";
import { refreshMyToken } from "./redux/actions/user-actions";
import User from "./pages/User";

const useStyles = makeStyles({
  container: {
    margin: "auto",
    maxWidth: "1200px",
    padding: "10px",
  },
});

function App() {
  const {
    user: { authenticated },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    checkTokenValid(getToken(), dispatch);
    let timer;
    if (authenticated) {
      timer = setInterval(() => {
        refreshMyToken(localStorage?.FBRefreshIdToken);
      }, 30000);
    }
    return timer;
    // eslint-disable-next-line
  }, [authenticated]);

  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className={classes.container}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <AuthRoute authenticated={authenticated} path="/login">
              <Login />
            </AuthRoute>
            <AuthRoute authenticated={authenticated} path="/signup">
              <Signup />
            </AuthRoute>
            <Route exact path="/users/:handle">
              <User />
            </Route>
            <Route exact path="/users/:handle/scream/:screamId">
              <User />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
