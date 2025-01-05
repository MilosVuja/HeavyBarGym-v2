const express = require("express");
const trainingPlanController = require("../controllers/trainingPlanController");
const authController = require("../controllers/authController");
const musclesController = require("../controllers/musclesController");

const router = express.Router();

router.use(authController.protect);

router.post("/", trainingPlanController.createTrainingPlan);

router.get(
  "/add",
  authController.protect,
  trainingPlanController.addExercise,
  trainingPlanController.updateExercise,
  trainingPlanController.deleteTrainingDay
);

module.exports = router;
