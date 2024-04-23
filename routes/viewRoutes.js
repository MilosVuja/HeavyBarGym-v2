const express = require("express");
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', authController.isLoggedIn, viewController.getMainPage);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/profile', authController.protect, viewController.getProfilePage)
router.get('/groupClassBooking', viewController.getGroupClassPage)


module.exports = router;