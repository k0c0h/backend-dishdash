const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  productId: String,
  name: String,
  category: String,
  product: String,
  brand: String,
  size: Number,
  sizeUnit: String,
  price: Number,
  availableUnits: Number,
  supplier: String
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
