const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  video: { type: String, required: true },
  instruction: { type: String, required: true },
  muscles: [{
    type: String,
    required: true,
  }],
});

module.exports = mongoose.model("Exercise", exerciseSchema);