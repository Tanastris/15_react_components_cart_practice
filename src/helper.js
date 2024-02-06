export const makePrice = (value, currency = '€') => {
  // 800

  return `${currency} ${value.toFixed(2)}`;
  // €800.00
};
