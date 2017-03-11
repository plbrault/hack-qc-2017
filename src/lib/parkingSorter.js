import gju from 'geojson-utils';

/**
 * Return an array of parkings, sorted from the nearest to the farthest,
 * with an added `distance` attribute.
 */
export function sortByProximity(parkingData, currentLat, currentLon) {
  const currentPoint = { type: 'Point', coordinates: [currentLon, currentLat] };
  return parkingData.map(parking => ({
    ...parking,
    distance: gju.pointDistance(currentPoint, parking.geojson),
  }))
  .sort((p1, p2) => p1.distance < p2.distance ? -1 : 1);
}

export default {
  sortByProximity,
};
