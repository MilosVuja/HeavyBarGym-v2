const catchAsync = require("../utilities/catchAsync")
const Member = require('../models/membersModel');
const fs = require("fs");


exports.getMainPage = (req, res,) => {
  res.status(200).render('main', {
    title: 'Heavy Bar Gym',
    member: res.locals.member
  })
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login',{
    title: 'Log into your account'
  })
}

exports.getProfilePage = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.user.id);
  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }
  res.render('profile', { member });
});

exports.updateMemberData = catchAsync (async (req, res, next)=>{
  const updatedMember = await Member.findByIdAndUpdate(
    req.member.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      photo: req.body.photo,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      // sex,
      goal: req.body.goal,
      program: req.body.program,
      height: req.body.height,
      weight: req.body.weight,
      bodyFat: req.body.bodyFat,
      bmi: req.body.bmi,
      waist: req.body.waist,
      arm: req.body.arm,
      thigh: req.body.thigh,
      // experiance,
      squat: req.body.squat,
      bench: req.body.bench,
      deadlift: req.body.deadlift
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('profile', {
    title: 'Your profile',
    member: updatedMember
  })
});



exports.getGroupClassPage = (req, res) => {
  res.status(200).render('groupClassBooking')
}

exports.getMuscleSelectPage = (req, res) => {
  res.status(200).render('muscleSelect', {
  })
}

exports.getChooseExercisesPage = (req, res) => {
  res.status(200).render('chooseExercises', {
  })
}