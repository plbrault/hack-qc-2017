import settings from '../settings.json';

const navigationHTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      html, body, #map {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {
        const parking = new google.maps.LatLng(__PARKING_LAT__, __PARKING_LNG__);
        const origin = new google.maps.LatLng(__ORIGIN_LAT__, __ORIGIN_LNG__);
        const destination = new google.maps.LatLng(__DESTINATION_LAT__, __DESTINATION_LNG__);
        const driving = new google.maps.DirectionsRenderer();
        const transit = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: __CENTER_LAT__,
            lng: __CENTER_LNG__,
          },
        });

        driving.setMap(map);
        transit.setMap(map);

        calcRoute(origin, parking, 'DRIVING', driving);
        calcRoute(parking, destination, 'TRANSIT',transit);
      }

      function calcRoute(origin, destination, travelMode, directionsDisplay) {
        const directionsService = new google.maps.DirectionsService();
        const request = { origin, destination, travelMode };
        directionsService.route(request, (result, status) => {
          if (status == 'OK') {
            directionsDisplay.setDirections(result);
          }
        });
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=${settings.googleApiKey}&callback=initMap" async defer></script>
  </body>
</html>`;

export default navigationHTML;
