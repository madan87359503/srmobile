import { Capacitor } from '@capacitor/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';

export async function initPush() {
  if (!Capacitor.isNativePlatform()) {
    console.log('Skipping push setup — running in browser');
    return;
  }

  console.log('Initializing Firebase Messaging...');

  // Request notification permission
  const permStatus = await FirebaseMessaging.requestPermissions();
  if (permStatus.receive === 'granted') {
    const token = await FirebaseMessaging.getToken();
    console.log('FCM Token:', token.token);
  } else {
    console.warn('Push permission not granted');
  }

  // Listen for notifications received in foreground
  FirebaseMessaging.addListener('notificationReceived', (notification) => {
    console.log('Notification received:', notification);
  });

  // Listen for notification tap actions
  FirebaseMessaging.addListener('notificationActionPerformed', (notification) => {
    console.log('Notification tapped:', notification);
  });
}
