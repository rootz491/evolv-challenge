const model = require("mongoose").model;
const exerciseSchema = require("../schemas/WorkoutPnP/exercise");
const exerciseInfoSchema = require("../schemas/Admin/exerciseInfo");
const exerciseSetSchema = require("../schemas/WorkoutPnP/exerciseSet");

const Exercise = model("Exercise", exerciseSchema);
const ExerciseInfo = model("ExerciseInfo", exerciseInfoSchema);
const ExerciseSet = model("ExerciseSet", exerciseSetSchema);

module.exports = {
    Exercise,
    ExerciseInfo,
    ExerciseSet
}