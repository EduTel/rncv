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

const { width } = Dimensions.get("window");

export default function About() {
  return (
    <SafeAreaView>
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
          <Text variant="headlineSmall">{profile.name}</Text>
          <Text variant="headlineSmall">{profile.phone}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Entypo name="email" size={24} color="black" />
            <Text variant="headlineSmall">{profile.email}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <FontAwesome name="birthday-cake" size={24} color="black" />
            <Text variant="headlineSmall">{profile.yearOfBirth}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    overflow: "hidden",
  },
  headerImage: {
    width: width,
    height: width,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
  },
});
