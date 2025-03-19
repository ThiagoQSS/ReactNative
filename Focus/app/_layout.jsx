import { Stack } from "expo-router";
import Colors from "../components/Colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        statusBarBackgroundColor: Colors.darkSurface,
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Focus" }} />
    </Stack>
  );
}
