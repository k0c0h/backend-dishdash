const IVA = 0.12;

exports.calculatePriceWithIVA = (price) => {
  return +(price + price * IVA).toFixed(2);
};

exports.applyBulkDiscount = (price, quantity) => {
  if (quantity >= 10) {
    return +(price * 0.95).toFixed(2);
  }
  return price;
};

exports.calculateDate = (year, month, day) => {
  if (!year || !month || !day) {
    return 'N/A';
  }
  // Crear fecha válida (month - 1 porque JavaScript usa meses 0-11)
  const date = new Date(year, month - 1, day);
  // Retornar en formato ISO YYYY-MM-DD
  return date.toISOString().split('T')[0];
}