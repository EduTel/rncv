import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from "@/hooks/useColorScheme";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import './../locales'

// Create a theme context to share the theme state across components
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export enum Lang {
  es = "es",
  en = "en",
}
export const langContext = createContext<
  {
    lang: Lang,
    setLang: Dispatch<SetStateAction<Lang>>
  }
>({
  lang: Lang.es,
  setLang: () => {}
})

export default function RootLayout() {
  const [lang, setLang] = useState(Lang.es);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
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
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <langContext.Provider value={{
          lang,
          setLang
        }}>
          <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </ThemeContext.Provider>     
        </langContext.Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
