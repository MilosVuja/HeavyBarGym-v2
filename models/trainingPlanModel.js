const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, default: null },
  reps: { type: Number, default: null },
  weight: { type: Number, default: null },
  duration: { type: Number, default: null },
  notes: String,
});

const TrainingDaySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  trainingType: { type: String, required: true },
  exercises: [ExerciseSchema],
});

const TrainingPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Training plan must have a name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: {
    type: Number,
    required: [true, "Training plan must have a duration (in weeks)"],
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  weekStart: {
    type: Date,
    required: true,
  },
  trainingDays: [TrainingDaySchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CompletedSessionSchema = new mongoose.Schema({
  member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
  },
  date: {
      type: Date,
      default: Date.now,
  },
  exercises: [
      {
          name: { type: String, required: true },
          sets: { type: Number, default: null },
          reps: { type: Number, default: null },
          weight: { type: Number, default: null },
          duration: { type: Number, default: null },
          notes: String,
      },
  ],
});

TrainingPlanSchema.add({
  completedSessions: [CompletedSessionSchema],
});

module.exports = mongoose.model("TrainingPlan", TrainingPlanSchema);