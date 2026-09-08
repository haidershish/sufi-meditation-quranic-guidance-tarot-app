import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, useApp } from "@/context/app";

function RootNavigator() {
  const { palette, isDark } = useApp();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: palette.background },
          headerTintColor: palette.text,
          headerTitleStyle: { color: palette.text },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: palette.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="draw/index" options={{ title: "Choose a spread" }} />
        <Stack.Screen name="draw/session" options={{ title: "Your reading", gestureEnabled: false }} />
        <Stack.Screen name="library/index" options={{ title: "Library" }} />
        <Stack.Screen name="library/[cardId]" options={{ title: "" }} />
        <Stack.Screen name="journal/index" options={{ title: "Journal" }} />
        <Stack.Screen name="journal/[sessionId]" options={{ title: "Reading" }} />
        <Stack.Screen name="about" options={{ title: "About & Guide" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
