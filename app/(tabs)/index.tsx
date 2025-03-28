import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import profile from "@/assets/json/profileEsp.json";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Text, useTheme } from "react-native-paper";
import { handlePressLink } from "@/utils/linking";
import { Header } from "@/components/headers/headers";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

export default function About() {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <Header>
        <Text variant="titleLarge" theme={theme}>
          Profile
        </Text>
        <MaterialCommunityIcons
          name="face-man-profile"
          size={24}
          color={theme.colors.onSurface}
        />
      </Header>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/profile.jpeg")}
            style={styles.headerImage}
          />
        </View>
        <ScrollView>
          <View style={{ gap: 5 }}>
            <Button
              icon="microsoft-internet-explorer"
              mode="text"
              onPress={() => handlePressLink(profile?.url)}
            >
              {profile?.url.split(".com")[0]}
            </Button>
            <Text theme={theme} variant="headlineSmall">
              {profile.name}
            </Text>
            <View style={styles.descriptionContainer}>
              <AntDesign
                name="phone"
                size={24}
                color={theme.colors.onSurface}
              />
              <Text theme={theme} variant="headlineSmall">
                {profile.phone}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Entypo name="email" size={24} color={theme.colors.onSurface} />
              <Text theme={theme} variant="headlineSmall">
                {profile.email}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <FontAwesome
                name="birthday-cake"
                size={24}
                color={theme.colors.onSurface}
              />
              <Text theme={theme} variant="headlineSmall">
                {profile.yearOfBirth}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  container: {
    overflow: "hidden",
    alignItems: "center",
  },
  headerImage: {
    borderRadius: 300,
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});
