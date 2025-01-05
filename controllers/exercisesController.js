const Exercises = require("../models/exercisesModel");
const catchAsync = require("../utilities/catchAsync");

exports.getAllExercises = catchAsync(async (req, res) => {
    const exercises = await Exercises.find();
    res.status(200).json({
        status: "success",
        data: { exercises },
    });
});

exports.addExercise = catchAsync(async (req, res) => {
    const { name, thumbnail, video, instruction, muscle } = req.body;

    const newExercise = new Exercises({
        name,
        thumbnail,
        video,
        instruction,
        muscle,
    });

    await newExercise.save();
    res.redirect('/exercises/add');
});