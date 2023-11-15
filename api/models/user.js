const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  weight_kg: {
    type: Number,
    required: true,
  },
  height_cm: {
    type: Number,
    required: true,
  },
  diabetes_type: {
    type: String,
    required: true,
  },
  medication_list: {
    type: [String],
    required: true,
  },
  caloric_goal_kcal: {
    type: Number,
    required: false,
  },
  hyper_mg_dl: {
    type: Number,
    required: true,
  },
  hypo_mg_dl: {
    type: Number,
    required: true,
  },
  target_lower_mg_dl: {
    type: Number,
    required: true,
  },
  target_upper_mg_dl: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
