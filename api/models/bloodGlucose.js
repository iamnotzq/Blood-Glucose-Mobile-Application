const mongoose = require("mongoose");

const bloodGlucoseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const BloodGlucoseEntry = mongoose.model(
  "BloodGlucoseEntry",
  bloodGlucoseSchema
);

module.exports = BloodGlucoseEntry;
