const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const exerciseSchema = require("./exercise.js");

const workoutSchema = new Schema({
  name: {
    type: String,
  },
  exercises: {
    type: [exerciseSchema],
  },
});

module.exports = workoutSchema;