const sampleData = require('./sampleData');
const { calculateDistance, toRadians } = require('../utils/geoUtils');

const TIME_MULTIPLIER = 3600; // 1 second in simulation = 1 hour in real time

function calculateNewPosition(shipment, route, timeDelta) {
  // calculate distance between current position and destination
  if (shipment.status === 'Unloading' || shipment.status === 'Completed') { //the ship is no longer moving 
    return handleStaticShip(shipment);
  }

  const { originCoords, destinationCoords } = route; // origin + destination coords from route
  const totalDistance = calculateDistance(originCoords, destinationCoords); // total distance from route (check func below)
  const moveDistance = (shipment.currentSpeed * 1.852 * timeDelta * TIME_MULTIPLIER) / 3600; // knots to km/h then km/s

  // new progress along route
  let newProgress = shipment.progress + (moveDistance / totalDistance);
  newProgress = Math.min(newProgress, 1); // make sure progress doesn't exceed 100%

  let newStatus = shipment.status;
  if (newProgress >= 0.99 && newProgress < 1) {
    newStatus = 'Approaching';
  } else if (newProgress >= 1) {
    newStatus = 'Arrived';
  } // otherwise it's something before approaching or arriving

  const newPosition = interpolatePosition(originCoords, destinationCoords, newProgress);

  return {
    position: newPosition,
    progress: newProgress,
    status: newStatus
  }
}

// handle ships that aren't moving
function handleStaticShip(shipment) {
  if (shipment.status === 'Unloading') {
    shipment.unloadingTime = Date.now(); // set unloading start time if not set

    if (shipment.unloadingTime >= 24 * 3600) { // 24 hours to unload
      return { ...shipment, status: 'Completed' };
    }
  }
  return shipment;
}
// interpolate between two positions based on fraction
function interpolatePosition(pos1, pos2, fraction) {
  const lat = pos1.lat + (pos2.lat - pos1.lat) * fraction;
  const lon = pos1.lon + (pos2.lon - pos1.lon) * fraction;
  return { lat, lon };
}

function updateAllShipments(timeDelta) { //timeDetla = amount of time that's passed since last update
  const updatedShipments = {};

  for (const [shipmentId, shipment] of Object.entries(sampleData.shipments)) { // Object.entries -> for iterating over objects
    const route = sampleData.routes.find(r => r.id === shipment.routeId);

    if (!route) {
      console.error(`Route not found for shipment ${shipmentId}`);
      continue;
    }

    const updatedShipmentData = calculateNewPosition(shipment, route, timeDelta);
    updatedShipments[shipmentId] =  { ...shipments, ...updatedShipmentData};
  }

  Object.assign(sampleData.shipments, updatedShipments);

  return updatedShipments;
}

module.exports = {
  updateAllShipments,
  interpolatePosition,
  calculateNewPosition
}