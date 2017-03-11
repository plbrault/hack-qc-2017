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
          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
          title: notificationTitle, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
          message: notificationMessage, // (required)
          actions: '["Poursuivre la navigation", "Annuler"]',
        });
      }
    });
  }
}

export default GeoFenceNotifier;
