const express = require("express");
const {
  postUserDetails,
  getAuthUserDetails,
  getUser,
  markNotificationsRead,
} = require("../controllers/users-controller");
const { uploadImage } = require("../controllers/users-controller");
const { FBAuth } = require("../middleware/authorization-middleware");

const router = express.Router();
router.post("/user/image", FBAuth, uploadImage);

router.post("/user", FBAuth, postUserDetails);

router.get("/user", FBAuth, getAuthUserDetails);

router.get("/user/:handle", getUser);

router.post("/notifications", FBAuth, markNotificationsRead);

module.exports = {
  routes: router,
};
