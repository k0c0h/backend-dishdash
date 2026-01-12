module.exports = (price) => {
  if (price < 0) throw new Error("El precio no puede ser negativo");
};
