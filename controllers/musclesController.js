const Muscles = require("../models/musclesModel");
const catchAsync = require("../utilities/catchAsync");

exports.getAllMuscles = catchAsync(async (req, res) => {
  const muscles = await Muscles.find();

  res.status(200).json({
    status: "Success",
    results: muscles.length,
    data: {
      muscles,
    },
  });
});

exports.addMuscle = catchAsync(async (req, res) => {
  const {
    name,
    latinName,
    bodyPart,
    muscleGroup,
    description,
    movements,
    exercises,
    equipment,
  } = req.body;

  const existingMuscle = await Muscles.findOne({ name });
  if (existingMuscle) {
    return res.status(400).render("addMuscle", {
      title: "Add Muscle",
      error: "A muscle with this name already exists.",
      formData: req.body,
    });
  }

  const exercisesArray = exercises
    ? exercises.split(",").map((exercise) => exercise.trim())
    : [];
  const equipmentArray = equipment
    ? equipment.split(",").map((equip) => equip.trim())
    : [];

  const newMuscle = new Muscles({
    name,
    latinName,
    bodyPart,
    muscleGroup,
    description,
    movements,
    exercises: exercisesArray,
    equipment: equipmentArray,
  });
  await newMuscle.save();
  res.status(200).json({
    status: "success",
    data: { newMuscle },
  });
});

exports.getMuscleByLatinName = async (req, res) => {
  const { latinName } = req.params;
  try {
    const muscle = await Muscles.findOne({ latinName });
    if (!muscle) {
      return res.status(404).json({ message: "Muscle not found" });
    }
    res.status(200).json(muscle);
  } catch (error) {
    res.status(500).json({ message: "Error fetching muscle", error });
  }
};
