const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllScribbles,
  createScribble,
} = require("../controllers/scribbleController");

const router = express.Router();

router.route("/").get(protect, getAllScribbles);
router.route("/create").post(protect, createScribble);

module.exports = router;
