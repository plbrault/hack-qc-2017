import BackgroundTimer from 'react-native-background-timer';
import gju from 'geojson-utils';

class GeoFence {
  static notififyNearLatLon(lat, lon, notifyDistance, cb) {
    this.distanceFromMe(lat, lon, (err, distance) => {
      if (err) {
        cb(err);
      } else if (distance <= notifyDistance) {
        cb(null, distance);
      } else {
        BackgroundTimer.setTimeout(() => {
          this.notififyNearLatLon(lat, lon, notifyDistance, cb);
        }, this.getTimeoutFromDistance(distance));
      }
    });
  }

  static distanceFromMe(lat, lon, cb) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;
        cb(null, gju.pointDistance({ type: 'Point', coordinates: [lon, lat] },
                                 { type: 'Point', coordinates: [currentLon, currentLat] }));
      },
      (error) => {
        cb(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  }

  static getTimeoutFromDistance(distance) {
    const distanceKm = distance / 1000;
    if (distanceKm > 10) {
      return 6000;
    }
    return 30000;
  }

}

export default GeoFence;
