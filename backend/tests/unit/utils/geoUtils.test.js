const { calculateDistance, toRadians } = require('../../../src/utils/geoUtils');

describe('geoUtils', () => {
  describe('toRadians', () => {
    it('should convert degrees to radians', () => {
      expect(toRadians(180)).toBeCloseTo(Math.PI, 5);
      expect(toRadians(90)).toBeCloseTo(Math.PI / 2, 5);
    })
  })

  describe('calculateDistance', () => {
    it('should calculate distance for cross-ocean shipments', () => {
      const rotterdam = { lat: 51.9496, lon: 4.1453 }; // Port of Rotterdam
      const newYork = { lat: 40.6677, lon: -74.0406 };  // Port of New York
      const expectedDistance = 5836; // km (approximate)
      
      const distance = calculateDistance(rotterdam, newYork);
      expect(distance).toBeCloseTo(expectedDistance, -2); // We allow for a difference of about 100 km
    });
  });
})