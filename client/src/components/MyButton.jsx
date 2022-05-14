import React from "react";
import { IconButton } from "@mui/material";

const MyButton = ({ children, ...rest }) => {
  return (
    <IconButton {...rest}>
      {children}
    </IconButton>
  );
};

export default MyButton;
