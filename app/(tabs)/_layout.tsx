import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PaperProvider } from "react-native-paper";
import { ThemeContext } from "../_layout";

export default function TabLayout() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[isDarkMode ? "dark" : "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
          },
          default: {
            backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-education-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="hobbies"
        options={{
          title: "Hobbies",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gamepad" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
