const express = require("express");
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getMainPage);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/profile', authController.protect, viewController.getProfilePage);
router.get('/groupClassBooking', viewController.getGroupClassPage);
router.get('/chooseExercises', viewController.getChooseExercisesPage);
router.get('/muscleSelect', viewController.getMuscleSelectPage);

module.exports = router;