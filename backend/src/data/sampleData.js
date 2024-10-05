// sampleData.js

exports.routes = [
  { 
    id: 'R001', 
    origin: 'Rotterdam, Netherlands', 
    originCoords: { lat: 51.9225, lon: 4.47917 },
    destination: 'Shanghai, China',
    destinationCoords: { lat: 31.2304, lon: 121.4737 }
  },
  { 
    id: 'R002', 
    origin: 'Hamburg, Germany', 
    originCoords: { lat: 53.5511, lon: 9.9937 },
    destination: 'New York, USA',
    destinationCoords: { lat: 40.7128, lon: -74.0060 }
  },
  { 
    id: 'R003', 
    origin: 'Antwerp, Belgium', 
    originCoords: { lat: 51.2213, lon: 4.4051 },
    destination: 'Singapore',
    destinationCoords: { lat: 1.3521, lon: 103.8198 }
  }
];

exports.shipments = {
  'SHIP001': { 
    routeId: 'R001', 
    currentPosition: { lat: 51.9225, lon: 4.47917 }, // Rotterdam
    status: 'Departing',
    topSpeed: 20, // knots
    currentSpeed: 15,
    progress: 0
  },
  'SHIP002': { 
    routeId: 'R002', 
    currentPosition: { lat: 53.5511, lon: 9.9937 }, // Hamburg
    status: 'Loading',
    topSpeed: 22,
    currentSpeed: 0,
    progress: 0
  },
  'SHIP003': { 
    routeId: 'R003', 
    currentPosition: { lat: 51.2213, lon: 4.4051 }, // Antwerp
    status: 'In Transit',
    topSpeed: 18,
    currentSpeed: 0,
    progress: 0.1
  }
};