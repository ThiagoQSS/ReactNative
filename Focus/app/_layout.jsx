import { Stack } from "expo-router";
import Colors from "../components/Colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Focus" }} />
    </Stack>
  );
}
