import { Stack } from "expo-router";
import Colors from "../components/constants/Colors";
import { useReducer } from "react";
import {
  notesContext,
  setNotesContext,
} from "../components/contexts/NotesContext";
import { MyProvider } from "../components/contexts/NotesContext";

export default function Layout() {
  return (
    <MyProvider>
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
    </MyProvider>
  );
}
