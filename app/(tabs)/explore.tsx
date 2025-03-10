import {
  StyleSheet,
  Image,
  Platform,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

const { height, width } = Dimensions.get("window");

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/profile.jpeg")}
          style={styles.headerImage}
        />
      </View>
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
