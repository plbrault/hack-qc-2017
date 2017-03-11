import settings from '../settings.json';


async function getDistancesToParkings(parkingData, originLat, originLon, departureTime) {
  const origin = `${originLat},${originLon}`;
  const destinations = parkingData.reduce((dest, parking) => `${dest}${parking.lat},${parking.lon}|`, '');

  let url;
  if (departureTime) {
    url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destinations}&mode=driving&departure_time=${departureTime}&key=${settings.googleApiKey}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destinations}&mode=driving&key=${settings.googleApiKey}`;
  }

  return fetch(url) // eslint-disable-line no-undef
    .then(response => response.json())
    .then(responseJson => responseJson.rows[0].elements);
}

async function getDistancesToDestination(parkingData, destinationLat, destinationLon, departureTime, arrivalTime) {
  const origins = parkingData.reduce((dest, parking) => `${dest}${parking.lat},${parking.lon}|`, '');
  const destination = `${destinationLat},${destinationLon}`;

  let url;
  if (departureTime) {
    url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destination}&mode=transit&departure_time=${departureTime}&key=${settings.googleApiKey}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destination}&mode=transit&arrival_time=${arrivalTime}&key=${settings.googleApiKey}`;
  }

  return fetch(url) // eslint-disable-line no-undef
    .then(response => response.json())
    .then(responseJson => responseJson.rows[0].elements);
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
  parkingData, originLat, originLon, destinationLat, destinationLon, departureTime, arrivalTime,
) {
  const distancesToParkings = await getDistancesToParkings(parkingData, originLat, originLon, departureTime);
  const distancesToDestination = await getDistancesToDestination(parkingData, destinationLat, destinationLon, departureTime, arrivalTime);
  return parkingData.map((parking, idx) => ({
    ...parking,
    totalDuration: distancesToParkings[idx].duration.value + distancesToDestination[idx].value + (15 * 60),
  }))
  .sort((p1, p2) => (p1.distanceInfo.duration.value < p2.distanceInfo.duration.value ? -1 : 1));
}

export default {
  sortByProximity,
};
