const express = require("express");
const { getScream, postScream, getSingleScream, postComment, postLike, postUnLike, deleteScream } = require("../controllers/scream-controller");
const { FBAuth } = require("../middleware/authorization-middleware");

const router = express.Router();

router.get("/scream",  getScream);
router.post("/scream", FBAuth, postScream);
router.get("/scream/:screamId", getSingleScream);
router.delete("/scream/:screamId", FBAuth, deleteScream);

router.post("/scream/:screamId/comment", FBAuth, postComment);
router.get("/scream/:screamId/like", FBAuth, postLike);
router.get("/scream/:screamId/unlike", FBAuth, postUnLike);

module.exports = {
  routes: router,
};
