const mongoose = require("mongoose");

const NutritionalContent = {
  calories: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
};

const foodEntry = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  food_name: {
    type: String,
    required: true,
  },
  portion_size: {
    type: Number,
    required: true,
  },
  meal_type: {
    type: String,
    required: true,
  },
  meal_description: {
    type: String,
    required: false,
  },
  nutritional_content: {
    type: NutritionalContent,
    required: true,
  },
});

const FoodEntry = mongoose.model("FoodEntry", foodEntry);

module.exports = FoodEntry;
