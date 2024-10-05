// dataStructures.js

/**
 * @typedef {Object} Coordinates
 * @property {number} lat - Latitude
 * @property {number} lon - Longitude
 */

/**
 * @typedef {Object} Route
 * @property {string} id - Unique identifier for the route
 * @property {string} origin - Name of the origin port
 * @property {Coordinates} originCoords - Coordinates of the origin
 * @property {string} destination - Name of the destination port
 * @property {Coordinates} destinationCoords - Coordinates of the destination
 */

/**
 * @typedef {Object} Shipment
 * @property {string} id - Unique identifier for the shipment
 * @property {string} routeId - ID of the route this shipment is on
 * @property {Coordinates} currentPosition - Current position of the ship
 * @property {string} status - Current status of the shipment
 * @property {number} topSpeed - Maximum speed of the ship in knots
 * @property {number} currentSpeed - Current speed of the ship in knots
 * @property {number} progress - Progress along the route (0 to 1)
 * @property {number} [unloadingTime] - Time spent unloading (if applicable)
 */

/**
 * @typedef {Object} ShipmentUpdate
 * @property {Coordinates} position - New position of the ship
 * @property {number} progress - New progress value
 * @property {string} status - New status
 * @property {number} [unloadingTime] - Updated unloading time (if applicable)
 */

module.exports = {
  // These are just type definitions, no actual code here
};