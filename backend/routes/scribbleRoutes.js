const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllScribbles,
  createScribble,
  getScribbleById,
  editScribble,
  deleteScribble,
} = require("../controllers/scribbleController");

const router = express.Router();

router.route("/").get(protect, getAllScribbles);
router.route("/create").post(protect, createScribble);
router.route("/:id").get(protect, getScribbleById);
router.route("/edit/:id").put(protect, editScribble);
router.route("/delete/:id").delete(protect, deleteScribble);

module.exports = router;
