import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ children, authenticated, ...rest }) {
  if (authenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest}>{children}</Route>;
}

export default AuthRoute;
