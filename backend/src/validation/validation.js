// validation.js

/**
 * @param {Coordinates} coords
 * @returns {boolean}
 */
function isValidCoordinates(coords) {
  return typeof coords === 'object' &&
         typeof coords.lat === 'number' &&
         typeof coords.lon === 'number' &&
         coords.lat >= -90 && coords.lat <= 90 &&
         coords.lon >= -180 && coords.lon <= 180;
}

/**
 * @param {Route} route
 * @returns {boolean}
 */
function isValidRoute(route) {
  return typeof route === 'object' &&
         typeof route.id === 'string' &&
         typeof route.origin === 'string' &&
         typeof route.destination === 'string' &&
         isValidCoordinates(route.originCoords) &&
         isValidCoordinates(route.destinationCoords);
}

/**
 * @param {Shipment} shipment
 * @returns {boolean}
 */
function isValidShipment(shipment) {
  return typeof shipment === 'object' &&
         typeof shipment.id === 'string' &&
         typeof shipment.routeId === 'string' &&
         isValidCoordinates(shipment.currentPosition) &&
         typeof shipment.status === 'string' &&
         typeof shipment.topSpeed === 'number' &&
         typeof shipment.currentSpeed === 'number' &&
         typeof shipment.progress === 'number' &&
         shipment.progress >= 0 && shipment.progress <= 1;
}

module.exports = {
  isValidCoordinates,
  isValidRoute,
  isValidShipment
};