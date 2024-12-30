const express = require("express");
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getMainPage);
router.get('/members/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/members/profile', authController.protect, viewController.getProfilePage);
router.get('/members/profile/your-training', authController.protect, viewController.getTrainingPage);
router.get('/members/groupClassBooking', viewController.getGroupClassPage);
router.get('/members/chooseExercises', viewController.getChooseExercisesPage);
router.get('/muscleSelect', viewController.getMuscleSelectPage);
router.get('/training-plans/add', viewController.getAddTrainingPlan);

module.exports = router;