const Exercises = require("../models/exercisesModel");
const catchAsync = require("../utilities/catchAsync");

const multer = require("multer");
const upload = multer();


exports.getAllExercises = catchAsync(async (req, res, next) => {
  const exercises = await Exercises.find();

  res.status(200).json({
    status: "Success",
    results: exercises.length,
    data: {
      exercises,
    },
  });
  next();
});

exports.FilteredExercises = catchAsync(async (req, res, next) => {
  const { muscles } = req.query;

  if (!muscles || muscles.length === 0) {
    return res.status(400).json({ status: "error", message: "No muscles provided." });
  }

  try {
    const parsedMuscles = JSON.parse(muscles);

    const exercises = await Exercises.find({ muscles: { $in: parsedMuscles } });

    const groupedExercises = parsedMuscles.map((muscle) => {
      return {
        muscle,
        exercises: exercises.filter((exercise) => exercise.muscles.includes(muscle))
      };
    });

    res.json({ status: "success", groupedExercises });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch exercises." });
  }
});

exports.addExercise = [
  upload.none(),
  catchAsync(async (req, res) => {
    const { name, thumbnail, video, instruction, muscle } = req.body;

    if (!name || !thumbnail || !video || !instruction || !muscle) {
      return res.status(400).json({
        message:
          "All fields are required, and at least one muscle must be selected.",
      });
    }

    let musclesArray;
    try {
      musclesArray = JSON.parse(muscle);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid format for muscle. It should be a valid JSON array.",
      });
    }

    if (!Array.isArray(musclesArray) || musclesArray.length === 0) {
      return res.status(400).json({
        message: "At least one muscle must be selected.",
      });
    }

    const existingExercise = await Exercises.findOne({ name });
    if (existingExercise) {
      return res.status(400).json({
        message: "An exercise with this name already exists.",
      });
    }

    const newExercise = new Exercises({
      name,
      thumbnail,
      video,
      instruction,
      muscles: musclesArray,
    });

    await newExercise.save();
    res.status(201).json({
      status: "success",
      data: { newExercise },
    });
  }),
];
