import settings from '../settings.json';

async function getDistances(parkingData, currentLat, currentLon) {
  const origin = `${currentLat},${currentLon}`;
  const destinations = parkingData.reduce((dest, parking) => `${dest}${parking.lat},${parking.lon}|`, '');
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destinations}&key=${settings.googleApiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(responseJson => responseJson.rows[0].elements);
}

/**
 * Return an array of parkings, sorted from the nearest to the farthest,
 * with an added `distanceInfo` attribute.
 *
 * `distanceInfo` example:
 * {
 *  index: null,
 *  distance: '807 km',
 *  distanceValue: 807366,
 *  duration: '7 hours 30 mins',
 *  durationValue: 26981,
 *  origin: 'San Francisco, CA, USA',
 *  destination: 'San Diego, CA, USA',
 *  mode: 'driving',
 *  units: 'metric',
 *  language: 'en',
 *  avoid: null,
 *  sensor: false
 *}
 */
export async function sortByProximity(parkingData, currentLat, currentLon) {
  const distances = await getDistances(parkingData, currentLat, currentLon);
  return parkingData.map((parking, idx) => ({
    ...parking,
    distanceInfo: distances[idx],
  }));
  //.sort((p1, p2) => (p1.distanceInfo.durationValue < p2.distanceInfo.durationValue ? -1 : 1));*/
}

export default {
  sortByProximity,
};
