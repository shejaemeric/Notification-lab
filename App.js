import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      await Notifications.getExpoPushTokenAsync();
    } else {
      alert("Must use physical device for Push Notifications");
    }
  }

  //function to send notification

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "CSE LAB 2024 Notification",
        body: "This is a notification from the app!",
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={{ display: "flex", marginTop: 380 }}>
      <TouchableOpacity
        onPress={async () => {
          await sendNotification();
        }}
        style={{
          backgroundColor: "#E83D66",
          padding: 3,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ padding: 20, fontSize: 12, color: "white" }}>
          Send Notification
        </Text>
      </TouchableOpacity>
    </View>
  );
}
