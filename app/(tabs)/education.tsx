import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import educationEs from "@/assets/json/educationEsp.json";
import educationEn from "@/assets/json/educationEng.json";

import Fontisto from "@expo/vector-icons/Fontisto";
import { EducationCard } from "@/components/education/EducationCard";
import { Text, useTheme } from "react-native-paper";
import { EducationCardComplete } from "@/components/education/EducationCardComplete";
import { Header } from "@/components/headers/headers";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Lang, langContext } from "../_layout";

const { height, width } = Dimensions.get("window");
const widthBackground = height * 1.54;

export type Experience = {
  id: number;
  company: string;
  url: string;
  location: {
    lat: number;
    long: number;
  };
  site?: string;
  position: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
};

export default function Education() {
  const {lang} = useContext(langContext)
  const [idEducation, setIdEducation] = useState("");
  const theme = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.animationContainer}>
        {/* <LottieView
          source={require("@/app/animation//GlobosAerostatico.json")}
          autoPlay
          loop
          resizeMode="cover"
          style={styles.animation}
        />
            */}
      </View>

      <View style={styles.contentContainer}>
        <Header>
          <Text
            variant="titleLarge"
            theme={theme}
            style={{ fontFamily: "Orbitron_400Regular" }}
          >
            Education
          </Text>
          <Ionicons name="school" size={24} color={theme.colors.onSurface} />
        </Header>
        {/*
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
        */}
        <View style={{ paddingHorizontal: 10 }}>
          <FlatList
          contentContainerStyle={styles.flatList}
            data={(lang === Lang.es ? educationEs: educationEn ).experience}
            renderItem={({ item, index }) => (
              <EducationCard
                item={item}
                index={index}
                setIdEducation={setIdEducation}
              />
            )}
            ListFooterComponent={() => (
              <View style={{ alignSelf: "center" }}>
               {/* <LottieView
                  source={require("@/app/animation/locationEnd.json")}
                  autoPlay
                  loop
                  renderMode="SOFTWARE"
                  style={styles.locationStart}
                />*/}
              </View>
            )}
          />
        </View>
      </View>
      <EducationCardComplete
        visible={idEducation}
        setIdEducation={setIdEducation}
        data={
          ((lang === Lang.es ? educationEs: educationEn ).experience.find(
            (education) => education?.id.toString() === idEducation
          ) ?? {}) as Experience
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatList:{
    marginHorizontal: 10
  },
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
