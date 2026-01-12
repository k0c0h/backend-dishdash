module.exports = (units) => {
  if (units > 0) throw new Error("No se puede eliminar un ingrediente con stock disponible");
};
