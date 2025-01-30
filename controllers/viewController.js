const catchAsync = require("../utilities/catchAsync");
const Muscles = require("../models/musclesModel");
const Exercises = require("../models/exercisesModel");

exports.getMainPage = (req, res) => {
  res.status(200).render("main", {
    title: "Heavy Bar Gym",
    member: res.locals.member,
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getProfilePage = catchAsync(async (req, res, next) => {
  if (!req.member) {
    return res.redirect("/login");
  }

  res.status(200).render("profile", {
    title: "Your Profile",
    member: req.member,
  });
});

exports.getTrainingPage = (req, res) => {
  res.status(200).render("training", {});
};

exports.getGroupClassPage = (req, res) => {
  res.status(200).render("groupClassBooking");
};

exports.getMuscleSelectPage = (req, res) => {
  res.status(200).render("muscleSelect", {});
};

exports.getChooseExercisesPage = (req, res) => {
  res.status(200).render("chooseExercises", {});
};

exports.getProfile = catchAsync(async (req, res) => {
  res.status(200).render("profile", {
    title: "Your profile",
    member: req.member,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getHome = (req, res) => {
  res.status(200).render("main", {
    title: "Home",
  });
};

exports.getAddTrainingPlan = (req, res) => {
  res.status(200).render("addTrainingPlan", {
    title: "Add Training Plan",
    exercises: res.locals.exercises,
  });
};

exports.getAddMusclePage = (req, res) => {
  res.status(200).render("addMuscles", {
    title: "Add Muscle",
  });
};

exports.getAddExercisePage = (req, res) => {
  res.status(200).render("addExercises", {
    title: "Add Exercise",
    muscles: res.locals.muscles,
  });
};
