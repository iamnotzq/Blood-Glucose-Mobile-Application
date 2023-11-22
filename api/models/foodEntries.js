const mongoose = require("mongoose");
const NutritionalContent = require("./NutritionalContent");

const foodEntry = new mongoose.Schema({
  userId: {
    type: String,
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
