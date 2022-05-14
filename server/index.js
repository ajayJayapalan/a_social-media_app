const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const functions = require("firebase/functions")


// default options, no immediate parsing
// routes
const screamRoute = require("./routes/scream-routes");
const signupRoute = require("./routes/signUp-routes");
const loginRoute = require("./routes/logIn-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// screams
app.use("/api", screamRoute.routes);


// user
app.use("/api", signupRoute.routes);
app.use("/api", loginRoute.routes);
app.use("/api", usersRoutes.routes);

app.listen(config.port, () =>
  console.log("Server is listening on url http://localhost:" + config.port)
);

