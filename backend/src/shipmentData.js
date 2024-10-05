const sampleData = require('./sampleData');

let routes = sampleData.routes;
let shipments = sampleData.shipments;

function getRoutes() {
  return routes;   
}

function getShipment(shipmentId) {
  return shipments[shipmentId];
}

function updateShipmentPosition(shipmentId, newPosition) {
  if (shipments[shipmentId]) {
    shipments[shipmentId].currentPosition = newPosition;
    return true;
  }
  return false;
}

function calculateNewPosition(shipment) {
  const route = routes.find(r => r.id === shipment.routeId);
  const start = shipment.currentPosition;
  let end;

  switch (route.destination) {
    case 'Shanghai, China':
      end = { lat: 31.2304, lon: 121.4737 };
      break;
    case 'New York, USA':
      end = { lat: 40.7128, lon: -74.0060 };
      break;
    case 'Singapore':
      end = { lat: 1.29027, lon: 103.851 };
      break;
    case 'Los Angeles, USA':
      end = { lat: 33.7288, lon: -118.2620 };
      break;
    default:
      end = start;
  }

  return {
    lat: start.lat + (end.lat - start.lat) * 0.01,
    lon: start.lon + (end.lon - start.lon) * 0.01
  }
}

module.exports = {
  getRoutes,
  getShipment,
  updateShipmentPosition,
  calculateNewPosition
};