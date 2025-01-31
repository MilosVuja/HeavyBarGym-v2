const express = require("express");
const trainingPlanController = require("../controllers/trainingPlanController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

//training-plans
router.get("/", trainingPlanController.getUserPlans);

router.post(
  "/add",
  authController.protect,
  trainingPlanController.saveTraining,
);

module.exports = router;
