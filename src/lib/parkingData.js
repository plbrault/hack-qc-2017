const PARKING_CAPACITY_URL = 'https://www.donneesquebec.ca/recherche/dataset/5bbe683c-d228-4d8c-b01e-51b88870b6c8/resource/7f103354-880d-404a-a94b-75f7c94ceaea/download/amt-capacites-stationnementsincitatifs-2015.csv';

export async function loadData() {
  const parkingCapacity = fetch(PARKING_CAPACITY_URL); // eslint-disable-line no-undef

  return parkingCapacity;
}
