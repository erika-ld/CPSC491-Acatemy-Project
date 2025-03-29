import { Stack } from "expo-router";
import { TimerProvider } from "./timerContext";
import { CoinsProvider } from "./coinsContext"; // Ensure the correct path to coinsContext

export default function RootLayout() {
  return (
    <CoinsProvider>
      <TimerProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "Acatemy" }} />
          <Stack.Screen name="Home" options={{ headerTitle: "Home" }} />
          <Stack.Screen name="Login" options={{ headerTitle: "Login" }} />
          <Stack.Screen name="Pet Customization" options={{ headerTitle: "Pet Customization" }} />
          <Stack.Screen name="Pet Maker" options={{ headerTitle: "Pet Maker" }} />
          <Stack.Screen name="Rewards List" options={{ headerTitle: "Rewards List" }} />
          <Stack.Screen name="Rewards" options={{ headerTitle: "Rewards" }} />
          <Stack.Screen name="Timer" options={{ headerTitle: "Focus Timer" }} />
          <Stack.Screen name="To Do List" options={{ headerTitle: "To-Do" }} />
        </Stack>
      </TimerProvider>
    </CoinsProvider>
  );
}