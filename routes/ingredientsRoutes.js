const express = require("express");
const router = express.Router();
const controller = require("../controllers/ingredientsController");

router.post("/", controller.createIngredient);     
router.get("/", controller.getIngredients);        
router.put("/:id", controller.updateIngredient);  
router.delete("/:id", controller.deleteIngredient); 
router.post("/sell", controller.sellIngredient);

module.exports = router;
