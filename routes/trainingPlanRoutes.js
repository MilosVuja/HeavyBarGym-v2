const express = require("express");
const trainingPlanController = require("../controllers/trainingPlanController");
const authController = require("../controllers/authController");
const exercisesController = require("../controllers/exercisesController.js");

const router = express.Router();

router.use(authController.protect);

router.post("/", trainingPlanController.createTrainingPlan);

router.get(
  "/add",
  authController.protect,
  trainingPlanController.addExercise,
  trainingPlanController.deleteTrainingDay,
  exercisesController.getAllExercises,
);

module.exports = router;
