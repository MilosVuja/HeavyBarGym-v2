const express = require('express');
const groupClassController = require('./../controllers/groupClassController')




const router = express.Router();



router
  .route('/')
  .get(groupClassController.getAllGroupClasses)
  .post(groupClassController.createGroupClass);

router
  .route('/:id')
  .get(groupClassController.getGroupClass)
  .patch(groupClassController.updateGroupClass)
  .delete(groupClassController.deleteGroupClass);

module.exports = router;
