const TrainingPlan = require("../models/trainingPlanModel");
const catchAsync = require("../utilities/catchAsync");
const Member = require("../models/membersModel");



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

exports.saveTraining = catchAsync(async (req, res, next) => {
  try {
    const { name, description, duration, trainingsPerWeek, weekStart, amountOfTrainings, trainingDays } = req.body;
    const memberId = req.member.id; // Extracted from auth middleware

    // Create new training plan
    const newTrainingPlan = new TrainingPlan({
        name,
        description,
        duration,
        trainingsPerWeek,
        weekStart,
        amountOfTrainings,
        trainingDays: trainingDays.map(day => ({
            day: day.day,
            trainingType: day.trainingType,
            exercises: day.exercises.map(exercise => ({
                name: exercise.name,
                video: exercise.video,
                instructions: exercise.instructions,
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight,
                rest: exercise.rest,
            }))
        })),
        member: memberId,
    });

    await newTrainingPlan.save();

    // Find the member and update their training history
    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ error: "Member not found" });

    // Move old training plan to history
    if (member.activeTrainingPlan) {
        member.trainingHistory.push({
            plan: member.activeTrainingPlan,
            startDate: new Date(),
            endDate: new Date(),
            completed: true,
        });
    }

    // Set new active training plan
    member.activeTrainingPlan = newTrainingPlan._id;
    await member.save();

    res.status(201).json({ message: "Training plan saved!", plan: newTrainingPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save training plan", message: error.message });
  }
});



// Fetch training history
exports.getTrainingHistory = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.member.id)
      .populate("activeTrainingPlan")
      .populate("trainingHistory.plan");

  if (!member) return res.status(404).json({ error: "Member not found" });

  res.status(200).json({
      activeTrainingPlan: member.activeTrainingPlan,
      trainingHistory: member.trainingHistory,
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
