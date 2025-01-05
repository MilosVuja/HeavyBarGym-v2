const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    video: { type: String, required: true },
    instruction: { type: String, required: true },
    muscle: { type: mongoose.Schema.Types.ObjectId, ref: 'Muscle', required: true }
});

module.exports = mongoose.model('Exercise', exerciseSchema);