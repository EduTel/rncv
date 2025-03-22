import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Switch, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ThemeContext } from "@/app/_layout";
import { StatusBar } from "expo-status-bar";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.surface}
        style={theme.dark ? "light" : "dark"}
      />
      <View style={{ backgroundColor: theme.colors.background }}>
        <View style={[styles.header, { alignItems: "center" }]}>
          <View style={{ flexDirection: "row", gap: 5 }}>{children}</View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <FontAwesome
              name="language"
              size={24}
              color={theme.colors.onSurface}
            />
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});
