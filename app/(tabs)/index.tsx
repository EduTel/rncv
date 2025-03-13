import {
  Image,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import education from "@/assets/json/education.json";
import Fontisto from "@expo/vector-icons/Fontisto";
import { EducationCard } from "@/components/education/EducationCard";
import { Text } from "react-native-paper";

const { height, width } = Dimensions.get("window");
const widthBackground = height * 1.54;

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("@/app/animation//GlobosAerostatico.json")}
          autoPlay
          loop
          resizeMode="cover"
          style={styles.animation}
        />
      </View>
      <View style={styles.contentContainer}>
        <View
          style={{
            backgroundColor: "#fff",
            marginBottom: 10,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text variant="titleLarge">Education</Text>
          <Fontisto name="date" size={24} color="black" />
        </View>
        <View style={{ alignSelf: "center" }}>
          <LottieView
            source={require("@/app/animation/locationStart.json")}
            autoPlay
            loop
            resizeMode="cover"
            renderMode="SOFTWARE"
            style={styles.locationStart}
          />
        </View>
        <FlatList
          data={education.experience}
          renderItem={({ item, index }) => (
            <EducationCard item={item} index={index} />
          )}
          ListFooterComponent={() => (
            <View style={{ alignSelf: "center" }}>
              <LottieView
                source={require("@/app/animation/locationEnd.json")}
                autoPlay
                loop
                renderMode="SOFTWARE"
                style={styles.locationStart}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  locationStart: {
    width: 100,
    height: 100,
    opacity: 1,
  },
  itemContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: "50%",
    //opacity: 0.7,
  },
  textSmall: {
    fontSize: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    zIndex: 1,
  },
  animation: {
    width: widthBackground,
    height: height,
    marginLeft: -widthBackground / 2.2,
  },
  animationContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
