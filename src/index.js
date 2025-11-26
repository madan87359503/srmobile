import { Capacitor } from '@capacitor/core';

async function startBackgroundService() {
  try {
    const result = await Capacitor.Plugins.BackgroundLocation.startTracking();
    console.log('Background service started:', result.status);
  } catch (e) {
    console.error('Failed to start background service:', e);
  }
}

async function stopBackgroundService() {
  try {
    const result = await Capacitor.Plugins.BackgroundLocation.stopTracking();
    console.log('Background service stopped:', result.status);
  } catch (e) {
    console.error('Failed to stop background service:', e);
  }
}

// Example usage: call when you want to start/stop
startBackgroundService();
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

// Initialize Push + Local Notifications
async function initNativePush() {
  console.log('Initializing native push...');

  const permStatus = await PushNotifications.requestPermissions();
  if (permStatus.receive !== 'granted') {
    console.warn('Push permission not granted');
    return;
  }

  await PushNotifications.register();

  // When registration succeeds (FCM token)
  PushNotifications.addListener('registration', (token) => {
    console.log('Push registration success:', token.value);
    // You can send this token to your backend if needed
  });

  // Registration error
  PushNotifications.addListener('registrationError', (error) => {
    console.error('Push registration error:', error);
  });

  // When a push arrives (foreground)
  PushNotifications.addListener('pushNotificationReceived', async (notification) => {
    console.log('Push received:', notification);

    // Show a local notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title || 'New Message',
          body: notification.body || 'You have a new notification.',
          id: Date.now(),
          extra: notification.data || {},
        },
      ],
    });
  });
}

// Run it once when the app starts
initNativePush();

// Then load your web app as usual:
const iframe = document.createElement('iframe');
iframe.src = 'https://sajilorental.com';
iframe.style.cssText = 'width:100%;height:100%;border:none;';
document.body.appendChild(iframe);



import { initPush } from './nativePush';


// 👇 Call native push setup
initPush();
