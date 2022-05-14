import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WrapperProvider from "./utils/WrapperProvider";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

ReactDOM.render(
  <React.StrictMode>
    <WrapperProvider>
      <App />
    </WrapperProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// "proxy": "http://localhost:8080/api"
