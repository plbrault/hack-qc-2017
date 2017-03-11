import parkingCapacityData from '../data/amt-capacites-stationnementsincitatifs.json';
import metropolitanEquipmentData from '../data/amt-equipementsmetropolitains.json';

const parkings = metropolitanEquipmentData.features
  .filter(feature => feature.properties.STATIONNEM === 1)
  .map(feature => ({
    name: feature.NOM,
    hasTerminus: feature.TERMINUS === 1,
    hasMetro: feature.METRO === 1,
    lat: feature.latitude,
    lon: feature.longitude,
    geojsonPoint: feature.geometry,
  }),
);
