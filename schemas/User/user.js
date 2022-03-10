const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    gender: {
      type: String,
      enum: ['M','F','T']
    },
    DOB: {
      type: Date,
    },
    phone: {
      type: Number,
      length: 10,
    },
    trainerRef: {
      type: mongoose.Types.ObjectId,
      ref: "Trainer",
    },
    sessions: {
      type: [mongoose.Types.ObjectId],
      ref: "Session",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;