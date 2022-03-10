const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSetSchema = new Schema({
  number: {
    type: Number,
    trim: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    required: true,
    min: 1,
  },
  suggestedWeight: {
    type: Number,
  },
  suggestedReps: {
    type: Number,
    required: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
  },
  performedWeight: {
    type: Number,
  },
  performedReps: {
    type: Number,
    trim: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
  },
});

module.exports = exerciseSetSchema;