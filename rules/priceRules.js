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
