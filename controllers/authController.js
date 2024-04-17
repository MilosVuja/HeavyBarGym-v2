const Member = require("./../models/membersModel");
const catchAsync = require('./../utilities/catchAsync');
const jwt = require('jsonwebtoken');

exports.signup = catchAsync (async (req, res, next) => {
  const newMember = await Member.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    pinCode: req.body.pinCode,
    confirmPinCode: req.body.confirmPinCode,
    phoneNumber: req.body.phoneNumber
  });

  const token = jwt.sign({ id: newMember._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EPIRES_IN});
  

  res.status(201).json({
    message: 'Success',
    data: {
      member: newMember
    }
  })
})