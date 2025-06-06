export function calculateQuote({ rooms = 0, squareFootage = 0, cleaningType = 'standard' } = {}) {
  const basePrice = 120;
  let price = basePrice;
  if (rooms > 3) price += (rooms - 3) * 15;
  if (squareFootage > 1200) price += ((squareFootage - 1200) / 100) * 5;
  if (cleaningType === 'deep') price *= 1.5;
  return price;
}

export function discount(amount, rate) {
  return amount * rate;
}
