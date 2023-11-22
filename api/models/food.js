const mongoose = require("mongoose");
const NutritionalContent = require("./NutritionalContent");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nutritional_content: {
    type: NutritionalContent,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
