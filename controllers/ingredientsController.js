const Ingredient = require("../models/Ingredient");
const priceRule = require("../rules/priceRule");
const stockRule = require("../rules/stockRule");
const categoryRule = require("../rules/categoryRule");
const deleteRule = require("../rules/deleteRule");
const {
  calculatePriceWithIVA,
  applyBulkDiscount
} = require("../rules/priceRules");

exports.sellIngredient = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    }

    // Regla: stock
    if (ingredient.availableUnits < quantity) {
      return res.status(400).json({
        message: "Stock insuficiente"
      });
    }

    // Reglas de negocio
    let priceWithIVA = calculatePriceWithIVA(ingredient.price);
    let finalPrice = applyBulkDiscount(priceWithIVA, quantity);

    // Actualizar stock
    ingredient.availableUnits -= quantity;
    await ingredient.save();

    res.json({
      product: ingredient.name,
      quantity,
      unitPrice: priceWithIVA,
      total: +(finalPrice * quantity).toFixed(2),
      discountApplied: quantity >= 10
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
exports.createIngredient = async (req, res) => {
  try {
    priceRule(req.body.price);
    stockRule(req.body.availableUnits);
    categoryRule(req.body.category);

    const ingredient = new Ingredient(req.body);
    await ingredient.save();

    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ
exports.getIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
};

// UPDATE
exports.updateIngredient = async (req, res) => {
  try {
    priceRule(req.body.price);
    stockRule(req.body.availableUnits);

    const updated = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    await Ingredient.findByIdAndDelete(id);

    res.json({ message: "Ingrediente eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
