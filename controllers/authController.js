const Member = require("./../models/membersModel");
const catchAsync = require('./../utilities/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utilities/appError');
const { promisify } = require('util');
const sendMail = require('./../utilities/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

exports.signup = catchAsync (async (req, res, next) => {
  const newMember = await Member.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    // confirmPinCode: req.body.confirmPinCode,
    phoneNumber: req.body.phoneNumber
  });

  const token = signToken(newMember._id);
  

  res.status(201).json({
    status: 'Success',
    token,
    data: {
      member: newMember
    }
  })
})

exports.login = catchAsync (async (req, res, next) =>{
  const {email, pinCode} = req.body;

  if(!email || !pinCode){
    return next(new AppError('Please provide email and pin code!', 400));
  }

  const member = await Member.findOne({email}).select('+pinCode');

  if(!member || !await member.correctPinCode(pinCode, member.pinCode)){
    return next(new AppError('Incorect email or pin code!', 401))
  }

  const token = signToken(member._id);
  res.status(200).json({
    status: 'Success!',
    token
  })
})

exports.protect = catchAsync (async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError('You are not logged in! PLease log in to get access!', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentMember = await Member.findById(decoded.id);

  if(!currentMember){
    return next(new AppError('This member belonging to this token does no longer exist!', 401))
  }

  req.member = currentMember;
  
  next();
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.member.role)){
      return next(new AppError('You dont have premission to perform this action', 403))
    }
    next();
  }
}