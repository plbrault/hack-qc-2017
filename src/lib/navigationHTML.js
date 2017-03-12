import settings from '../settings.json';

// NOTE: DO NOT ADD Comments to variable
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
        const arriveBy = '__ARRIVE_BY__';
        const departAt = '__DEPART_AT__';
        const origin = '__ORIGIN__';
        const parking = new google.maps.LatLng(__PARKING_LAT__, __PARKING_LNG__);
        const destination = '__DESTINATION__';
        const driving = new google.maps.DirectionsRenderer();
        const transit = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: __CENTER_LAT__,
            lng: __CENTER_LNG__,
          },
        });

        let originLatLon;
        let destinationLatLon;

        function geocode(location, callback) {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: location }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              callback(new google.maps.LatLng(+results[0].geometry.location.lat(), +results[0].geometry.location.lng()));
            }
          });
        }

        geocode(origin, (originLL) => {
          originLatLon = originLL;

          geocode(destination, (destinationLL) => {
            destinationLatLon = destinationLL;

            const transitRequest = {
              origin: parking,
              destination,
              travelMode: 'TRANSIT',
              transitOptions: {},
            };
            const drivingRequest = {
              origin,
              destination: parking,
              travelMode: 'DRIVING',
            };
      
            driving.setMap(map);
            transit.setMap(map);

            if (arriveBy && arriveBy != '') {
              transitRequest.transitOptions.arrivalTime = new Date(arriveBy);

              calcRoute(transitRequest, (transitDirections) => {
                transit.setDirections(transitDirections);

                calcRoute(drivingRequest, (drivingDirections) => {
                  driving.setDirections(drivingDirections);
                });
              });
            } else {
              calcRoute(drivingRequest, (drivingDirections) => {
                driving.setDirections(drivingDirections);

                transitRequest.transitOptions.departureTime = new Date();

                calcRoute(transitRequest, (transitDirections) => {
                  transit.setDirections(transitDirections);
                });
              });
            }
          });
        });
      }

      function calcRoute(request, callback) {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(request, (result, status) => {
          if (status == 'OK') {
            callback(result);
          } else {
            callback(null);
          }
        });
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=${settings.googleApiKey}&callback=initMap" async defer></script>
  </body>
</html>`;

export default navigationHTML;
