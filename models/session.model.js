const mongoose = require("mongoose");
const sessionSchema = require("../schemas/WorkoutPnP/session");

const Session = mongoose.model("Session", sessionSchema);

module.exports = {Session};