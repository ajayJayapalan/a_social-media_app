import React from "react";

// REDUX
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

function WrapperProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );
}

export default WrapperProvider;
