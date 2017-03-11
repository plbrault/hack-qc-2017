import parkingCapacityData from '../data/amt-capacites-stationnementsincitatifs.json';
import metropolitanEquipmentData from '../data/amt-equipementsmetropolitains.json';

const parkings = metropolitanEquipmentData.features
  .filter(feature => feature.properties.STATIONNEM === 1)
  .map(feature => ({
    name: feature.properties.NOM,
    hasTerminus: feature.properties.TERMINUS === 1,
    hasMetro: feature.properties.METRO === 1,
    lat: feature.properties.latitude,
    lon: feature.properties.longitude,
    geojson: feature.properties.geometry,
  }),
);

export default parkings;
