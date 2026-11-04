import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.background },
          headerBackTitle: "Retour",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="devices/[deviceId]" options={{ title: "Détail de l’appareil" }} />
        <Stack.Screen name="devices/add" options={{ title: "Ajouter un appareil", presentation: "modal" }} />
        <Stack.Screen name="measurements/[measurementId]" options={{ title: "Détail de la mesure" }} />
        <Stack.Screen name="about" options={{ title: "À propos" }} />
      </Stack>
    </>
  );
}
