/**
 * Parking Data
 *
 * Format:
 * [
 *  {
 *    name: <!STRING>,
 *    hasTerminus: <!BOOLEAN>,
 *    hasMetro: <!BOOLEAN>,
 *    lat: <!NUMBER>,
 *    lon: <!NUMBER>,
 *    geojson: <!GeoJSON Point>,
 *    numPlaces: {
 *      total: <?NUMBER>,
 *      withFee: <?NUMBER>,
 *      forCarpoolers: <?NUMBER>,
 *      withEVStation: <?NUMBER>,
 *    }
 *  },
 *  ...
 * ]
 */

import parkingCapacityData from '../data/amt-capacites-stationnementsincitatifs.json';
import metropolitanEquipmentData from '../data/amt-equipementsmetropolitains.json';

const parkingCapacityByName = parkingCapacityData.reduce((parkings, parking) => {
  const newParkings = { ...parkings };
  newParkings[parking.NOM_STAT] = parking;
  return newParkings;
}, {});

const parkings = metropolitanEquipmentData.features
  .filter(feature => feature.properties.STATIONNEM === 1)
  .map(feature => ({
    name: feature.properties.NOM,
    hasTerminus: feature.properties.TERMINUS === 1,
    hasMetro: feature.properties.METRO === 1,
    lat: feature.properties.latitude,
    lon: feature.properties.longitude,
    geojson: feature.geometry,
    numPlaces: {
      total: (parkingCapacityByName[feature.properties.NOM] || {}).STAT_REG,
      withFee: (parkingCapacityByName[feature.properties.NOM] || {}).STAT_PAYANT,
      forCarpoolers: (parkingCapacityByName[feature.properties.NOM] || {}).STAT_COVOIT,
      withEVStation: (parkingCapacityByName[feature.properties.NOM] || {}).STAT_BORNE_ELECTRIQUE,
    },
  }));

export default parkings;
