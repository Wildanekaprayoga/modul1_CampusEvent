import { EventProvider } from "../src/context/EventContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <EventProvider>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#F7F7FC" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "CampusEvent" }} />
      <Stack.Screen name="event/[id]" options={{ title: "Event Detail" }} />
      <Stack.Screen name="register/[id]" options={{ title: "Registration" }} />
      <Stack.Screen name="success" options={{ title: "Registration Success" }} />
    </Stack>
    </EventProvider>
  );
}
