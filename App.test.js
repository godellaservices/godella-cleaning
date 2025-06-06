import { calculateQuote, discount } from './quoteUtils.js';

describe('Quote calculations', () => {
  test('deep clean with extra rooms and square footage', () => {
    const price = calculateQuote({ rooms: 5, squareFootage: 1600, cleaningType: 'deep' });
    expect(price).toBe(255);
  });

  test('membership discount calculation', () => {
    const discounted = discount(200, 0.8);
    expect(discounted).toBe(160);
  });
});
