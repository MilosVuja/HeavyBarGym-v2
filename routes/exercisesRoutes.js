const express = require("express");
const exercisesController = require("../controllers/exercisesController");
const authController = require("../controllers/authController");

const router = express.Router();

//exercises
router.get("/", authController.protect, exercisesController.FilteredExercises);

router
  .route("/add")
  .post(authController.protect, exercisesController.addExercise);

module.exports = router;
