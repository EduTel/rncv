import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { Switch, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ThemeContext } from "@/app/_layout";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";

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
      <View
        style={{
          //backgroundColor: theme.dark ? "dark" : "light",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <View style={[styles.header, { alignItems: "center" }]}>
          <View style={{ flexDirection: "row", gap: 5 }}>{children}</View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <FontAwesome
              name="language"
              size={24}
              color={theme.colors.onSurface}
            />
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  borderRadius: 50,
                  width: 70,
                  paddingVertical: 2,
                  paddingHorizontal: 2,
                  backgroundColor: isDarkMode ? "white" : "black",
                },
                isDarkMode
                  ? { backgroundColor: "#c493db" }
                  : { backgroundColor: "#6a6b66" },
              ]}
            >
              <Animated.View
                style={[
                  {
                    height: "100%",
                    width: "40%",
                    transform: [
                      {
                        translateX: new Animated.Value(
                          isDarkMode ? 1 : 0
                        ).interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 30], // Moves 30 units right when toggled
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Pressable
                  onPress={() => {
                    Animated.timing(new Animated.Value(isDarkMode ? 1 : 0), {
                      toValue: isDarkMode ? 0 : 1,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    toggleTheme();
                  }}
                >
                  {isDarkMode ? (
                    <Feather name="moon" size={24} color="#fff" />
                  ) : (
                    <Feather name="sun" size={24} color="#c8e00b" />
                  )}
                </Pressable>
              </Animated.View>
            </View>

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
