const TrainingPlan = require("../models/trainingPlanModel");
const catchAsync = require("../utilities/catchAsync");

exports.createTrainingPlan = catchAsync(async (req, res) => {
  const newPlan = await TrainingPlan.create({
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
    duration: req.body.duration,
    difficulty: req.body.difficulty,
    weekStart: req.body.weekStart || new Date(),
    trainingDays: req.body.trainingDays,
  });

  res.status(201).json({
    status: "success",
    data: { plan: newPlan },
  });
});

exports.getUserPlans = catchAsync(async (req, res) => {
  const plans = await TrainingPlan.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: plans.length,
    data: { plans },
  });
});

exports.addExercise = catchAsync(async (req, res) => {
  const { planId, dayId } = req.params;
  const newExercise = {
    name: req.body.name,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    duration: req.body.duration,
    notes: req.body.notes,
  };

  const plan = await TrainingPlan.findOneAndUpdate(
    {
      _id: planId,
      "trainingDays._id": dayId,
    },
    {
      $push: { "trainingDays.$.exercises": newExercise },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { plan },
  });
});

exports.updateExercise = catchAsync(async (req, res) => {
  const { planId, dayId, exerciseId } = req.params;
  const updates = req.body;

  const plan = await TrainingPlan.findOneAndUpdate(
    {
      _id: planId,
      "trainingDays._id": dayId,
      "trainingDays.exercises._id": exerciseId,
    },
    {
      $set: {
        "trainingDays.$[day].exercises.$[exercise]": {
          ...updates,
          _id: exerciseId,
        },
      },
    },
    {
      arrayFilters: [{ "day._id": dayId }, { "exercise._id": exerciseId }],
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: { plan },
  });
});

exports.deleteTrainingDay = catchAsync(async (req, res) => {
  const { planId, dayId } = req.params;

  await TrainingPlan.findByIdAndUpdate(planId, {
    $pull: { trainingDays: { _id: dayId } },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
