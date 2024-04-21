const express = require("express");
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getMainPage);
router.get('/login', viewController.getLoginPage);
router.get('/profile', viewController.getProfilePage)
router.get('/groupClassBooking', viewController.getGroupClassPage)


module.exports = router;