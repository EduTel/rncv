import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { createContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

// Create a theme context to share the theme state across components
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  console.log("isDarkMode", isDarkMode);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ThemeContext.Provider>
    </PaperProvider>
  );
}
