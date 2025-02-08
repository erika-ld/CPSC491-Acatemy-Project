import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{headerTitle: "Acatemy"}}/>
    <Stack.Screen name="Homepage" options={{headerTitle: "Homepage"}}/>
  </Stack>
  );
}
