import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../components/Colors";
import RightIcon from "../../components/commom/RightIcon";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,  
        }}
      />
    </Stack>
  );
}
