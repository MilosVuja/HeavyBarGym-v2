const express = require('express');
const memberController = require('../controllers/memberController');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/', authController.login);

router.route('/profile')
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
