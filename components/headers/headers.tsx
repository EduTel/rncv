import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { useTheme } from "react-native-paper";
import { useContext } from "react";
import { Lang, langContext, ThemeContext } from "@/app/_layout";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import { Shadow } from "react-native-shadow-2";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const {lang, setLang} = useContext(langContext)
  console.log(lang)

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.surface}
        style={theme.dark ? "light" : "dark"}
      />
      <Shadow startColor={theme.dark ? "#000": "#939694"} endColor={theme.dark ? "#222423": "#fff" } style={{ width: "100%", marginBottom: 20}}  sides={{ bottom: true, top: false, start: false, end: false }}>
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
              <Pressable
                onPress={()=>{
                  setLang((prev)=>prev===Lang.en ? Lang.es : Lang.en)
                }}
              >
                <FontAwesome
                  name="language"
                  size={24}
                  color={theme.colors.onSurface}
                />
              </Pressable>
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
                <View
                  style={[
                    styles.darkMode,
                    isDarkMode
                      ? { backgroundColor: "#c493db" }
                      : { backgroundColor: "#6a6b66" },
                  ]}
                >
                  <Animated.View
                    style={[
                      {
                      
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
                      {isDarkMode ? (
                        <Feather name="moon" size={24} color="#fff" />
                      ) : (
                        <Feather name="sun" size={24} color="#c8e00b" />
                      )}
                  </Animated.View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Shadow>
    </>
  );
};
const styles = StyleSheet.create({
  darkMode: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 50,
    width: 70,
    paddingVertical: 2,
    paddingHorizontal: 2,
    alignSelf: 'center'
  },
  header: {
    marginBottom: 5,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});
