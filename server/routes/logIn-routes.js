const express = require("express");
const { postLogin, refreshRoute } = require("../controllers/logIn-controller");

const router = express.Router();

router.post("/login", postLogin);

router.get("/refresh", refreshRoute)

module.exports = {
  routes: router,
};
