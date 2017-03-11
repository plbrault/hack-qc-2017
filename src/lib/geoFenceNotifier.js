import PushNotification from 'react-native-push-notification';
import GeoFence from './geoFence';

class GeoFenceNotifier {
  static noticeMeWhenNear(lat, lon, notifyDistance, notificationTitle, notificationMessage) {
    GeoFence.notififyNearLatLon(lat, lon, notifyDistance, (err) => {
      if (err) {
        if (err.code === 3) {
          this.noticeMeWhenNear(lat, lon, notifyDistance, notificationMessage);
        } else {
          console.error(err);
        }
      } else {
        PushNotification.localNotification({
          /* iOS and Android properties */
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_notification',
          title: notificationTitle,
          message: notificationMessage,
        });
      }
    });
  }
}

export default GeoFenceNotifier;
