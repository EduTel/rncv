import {
  Image,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
//import { HelloWave } from "@/components/HelloWave";
//import ParallaxScrollView from "@/components/ParallaxScrollView";
//import { ThemedText } from "@/components/ThemedText";
//import { ThemedView } from "@/components/ThemedView";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import education from "@/app/json/education.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

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
          <Text style={styles.text}>Education</Text>
          <Fontisto name="date" size={24} color="black" />
        </View>
        <FlatList
          data={education.experience}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              underlayColor="#fff" // O el mismo color de fondo que uses
              onPress={() => {}}
              style={[
                styles.itemContainer,
                index % 2 === 1
                  ? { alignSelf: "flex-end" }
                  : { alignSelf: "flex-start" },
              ]}
            >
              <>
                <Text style={styles.text}>{item.company}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textSmall}>{item.start_date}</Text>
                  <Text style={styles.textSmall}>{item.end_date}</Text>
                </View>
              </>
            </TouchableHighlight>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
