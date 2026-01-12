const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ingredientRoutes = require("./routes/ingredientsRoutes");

const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/dishdash/ingredients", ingredientRoutes);

module.exports = app;
