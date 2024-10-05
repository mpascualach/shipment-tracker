// manualTest.js

const {
  calculateDistance,
  interpolatePosition,
  toRadians,
  updateShipmentPosition
} = require('./shipmentSimulation'); // Assuming this is the name of our main file

// Test data
const testRoute = {
  id: 'R001',
  originCoords: { lat: 51.9225, lon: 4.47917 }, // Rotterdam
  destinationCoords: { lat: 31.2304, lon: 121.4737 }, // Shanghai
};

const testShipment = {
  id: 'SHIP001',
  routeId: 'R001',
  currentPosition: { lat: 51.9225, lon: 4.47917 },
  status: 'In Transit',
  currentSpeed: 20, // knots
  progress: 0
};

// Test calculateDistance
console.log('Testing calculateDistance:');
const distance = calculateDistance(testRoute.originCoords, testRoute.destinationCoords);
console.log(`Distance from Rotterdam to Shanghai: ${distance.toFixed(2)} km`);

// Test interpolatePosition
console.log('\nTesting interpolatePosition:');
const midwayPosition = interpolatePosition(testRoute.originCoords, testRoute.destinationCoords, 0.5);
console.log('Midway position:', midwayPosition);

// Test toRadians
console.log('\nTesting toRadians:');
console.log('90 degrees in radians:', toRadians(90));

// Test updateShipmentPosition
console.log('\nTesting updateShipmentPosition:');
// We need to mock the sampleData for this test
global.sampleData = {
  shipments: { 'SHIP001': testShipment },
  routes: [testRoute]
};
const updatedShipment = updateShipmentPosition('SHIP001');
console.log('Updated shipment:', updatedShipment);
