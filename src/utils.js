export function getPrecisionMultiplier() {
  return Math.pow(10, 2);
}

export function convertCurrency(amount, baseRate, targetRate) {
  return amount / baseRate * targetRate;
}

export function formatRate(amount) {
  return (amount / getPrecisionMultiplier()).toFixed(5);
}

export function formatBalance(amount) {
  return (amount / getPrecisionMultiplier()).toLocaleString();
}

export function processAmountInput(floatValue) {
  return Math.abs(floatValue * getPrecisionMultiplier() || 0);
}