import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "UdaciCards:notifications";

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

const createNotification = () => {
  return {
    title: "Study Reminder!",
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
};

export const setLocalNotification = async () => {
  try {
    const response = await AsyncStorage.getItem(NOTIFICATION_KEY);
    const data = await JSON.parse(response);

    if (data === null) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === "granted") {
        // Clear all notifications to make sure we don't set multiple.
        Notifications.cancelAllScheduledNotificationsAsync();
        // Schedule a repeat notification for the current hour local time
        // at the top of the hour, which should effectively trigger starting
        // the next day.
        const day = new Date();
        const resp = await Notifications.scheduleNotificationAsync({
          content: createNotification(),
          trigger: {
            hour: day.getHours(),
            minute: 0,
            repeats: true,
          },
        });
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    }
  } catch (err) {
    console.error("setLocalNotification:AsyncStorage.getItem:err=", err);
  }
};
