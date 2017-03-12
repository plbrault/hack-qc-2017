import settings from '../settings.json';

async function getDistancesToParkings(parkingData, origin) {
  const destinations = parkingData.reduce((dest, parking) => `${dest}${parking.lat},${parking.lon}|`, '');

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destinations}&mode=driving&key=${settings.googleApiKey}`;

  return fetch(url) // eslint-disable-line no-undef
    .then(response => response.json())
    .then(responseJson => responseJson.rows[0].elements);
}

async function getDistancesToDestination(parkingData, destination) {
  const origins = parkingData.reduce((dest, parking) => `${dest}${parking.lat},${parking.lon}|`, '');

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destination}&mode=transit&key=${settings.googleApiKey}`;

  return fetch(url) // eslint-disable-line no-undef
    .then(response => response.json())
    .then(responseJson => responseJson.rows.map(row => row.elements[0]));
}

/**
 * Return an array of parkings, sorted from the shortest to longest total duration,
 * with an added `totalDuration` (in seconds) attribute.
 *
 * @param [object[]] parkingData
 * @param [number] currentLat
 * @param [number] currentLon
 * @param [number] destinationLat
 * @param [number] destinationLon
 * @param [?UnixTimestamp] departureTime
 * @param [?UnixTimestamp] arrivalTime
 */
export async function sortByProximity(
  parkingData, origin, destination,
) {
  const distancesToParkings = await getDistancesToParkings(parkingData, origin);
  const distancesToDestination = await getDistancesToDestination(parkingData, destination);

  const result = parkingData.map((parking, idx) => ({
    ...parking,
    totalDuration: distancesToDestination[idx].duration ? distancesToParkings[idx].duration.value + distancesToDestination[idx].duration.value + (15 * 60) : null,
  }))
  .filter(parking => parking.totalDuration !== null)
  .sort((p1, p2) => (p1.totalDuration < p2.totalDuration ? -1 : 1));

  return result;
}

export default {
  sortByProximity,
};
