const express = require("express");
const { postSignup } = require("../controllers/signUp-controllers");

const router = express.Router();

router.post("/signup", postSignup);

module.exports = {
  routes: router,
};
