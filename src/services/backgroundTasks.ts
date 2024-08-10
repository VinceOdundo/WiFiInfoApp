import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import { fetchWifiInfo, assessWifiSecurity } from './wifiService.ts';
import { store } from '../store/index.ts';
import { updateWifiInfo } from '../store/slices/wifiSlice.ts';

export const configureBackgroundTasks = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // fetch every 15 minutes
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    },
    async (taskId) => {
      console.log('[BackgroundFetch] Task received: ', taskId);
      await performBackgroundTask();
      BackgroundFetch.finish(taskId);
    },
    (error) => {
      console.error('[BackgroundFetch] Failed to configure:', error);
    }
  );
};

const performBackgroundTask = async () => {
  try {
    const wifiInfo = await fetchWifiInfo();
    store.dispatch(updateWifiInfo(wifiInfo));

    const securityScore = await assessWifiSecurity();
    if (securityScore < 50) {
      showNotification('WiFi Security Alert', 'Your current WiFi network may not be secure.');
    }

    if (wifiInfo.strength < -70) {
      showNotification('Weak WiFi Signal', 'Your WiFi signal is weak. Consider moving closer to your router.');
    }
  } catch (error) {
    console.error('Error in background task:', error);
  }
};

export const showNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
  });
};

export const configureNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};