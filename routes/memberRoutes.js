const express = require('express');
const memberController = require('../controllers/memberController');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


router.route('/profile')
.get(authController.isLoggedIn, memberController.getMember)
.patch(authController.protect, memberController.updateMember)
.delete(authController.protect, memberController.deleteMember);

router
  .route('/')
  .get(memberController.getAllMembers)
  .post(memberController.createMember);

router
  .route('/:id')
  .get(memberController.getMember)
  .patch(memberController.updateMember)
  .delete(memberController.deleteMember);

module.exports = router;
