const EARTH_RADIUS = 6371; // km

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(pos1, pos2) {  // calculate distance between two points on Earth - Haversine formula
  const dLat = toRadians(pos2.lat - pos1.lat);
  const dLon = toRadians(pos2.lon - pos1.lon);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(pos1.lat)) * Math.cos(toRadians(pos2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return EARTH_RADIUS * c;
}

module.exports = {
  calculateDistance,
  toRadians
};