const model = require("mongoose").model;
const trainerSchema = require("../schemas/Trainer/trainer");
const userSchema = require("../schemas/User/user");

const Trainer = model("Trainer", trainerSchema);
const User = model("User", userSchema);

module.exports = {
    Trainer,
    User
}
