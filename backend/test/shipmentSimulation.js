const sampleData = require('./sampleData');

const EARTH_RADIUS = 6371; // earth's radius in km

function calculateNewPosition(shipment, route) {
  // calculate distance between current position and destination
  if (shipment.status === 'Unloading' || shipment.status === 'Completed') { //the ship is no longer moving 
    return handleStaticShip(shipment);
  }

  const { originCoords, destinationCoords } = route; // origin + destination coords from route
  const totalDistance = calculateDistance(originCoords, destinationCoords); // total distance from route (check func below)
  const moveDistance = (shipment.currentSpeed * 1.852) / 3600; // knots to km/h then km/s

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

    // simulate unloading time (5 units at a time)
    shipment.unloadingTime = (shipment.unloadingTime || 0) + 5;

    if (shipment.unloadingTime >= 10) { // completed condition
      return { ...shipment, status: 'Completed' };
    }
  }
  return shipment;
}

// calculate distance between two points on Earth - Haversine formula
function calculateDistance(pos1, pos2) {
  const dLat = toRadians(pos2.lat - pos1.lat);
  const dLon = toRadians(pos2.lon - pos1.lon);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(pos1.lat)) * Math.cos(toRadians(pos2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return EARTH_RADIUS * c;
}

// interpolate between two positions based on fraction
function interpolatePosition(pos1, pos2, fraction) {
  const lat = pos1.lat + (pos2.lat - pos1.lat) * fraction;
  const lon = pos1.lon + (pos2.lon - pos1.lon) * fraction;
  return { lat, lon };
}

// helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

module.exports = {
  updateShipmentPosition: function(shipmentId) {
    const shipment = sampleData.shipments[shipmentId];
    const route = sampleData.routes.find(r => r.id === shipment.routeId);

    if (!shipment || !route) {
      throw new Error('Shipment or route not found');
    }

    const newShipmentData = calculateNewPosition(shipment, route);
    
    // Update the shipment data
    Object.assign(shipment, newShipmentData);

    return shipment;
  },
  calculateDistance,
  interpolatePosition,
  toRadians,
  calculateNewPosition
}