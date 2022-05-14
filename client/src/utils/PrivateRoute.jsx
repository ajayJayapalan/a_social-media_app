import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, authenticated, ...rest }) {
  if (authenticated) {
    return <Route {...rest}>{children}</Route>;
  }

  return <Redirect to="/login" />;
}

export default PrivateRoute;
