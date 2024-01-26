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

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "CSE LAB 2024 React Notification",
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
          padding: 2,
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
