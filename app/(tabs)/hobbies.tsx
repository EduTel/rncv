import { Image, StyleSheet, View, Dimensions, SectionList } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");
const widthBackground = height * 1.54;
import * as FileSystem from "expo-file-system";
import AwesomeGallery from "react-native-awesome-gallery";
import { Header } from "@/components/headers/headers";
import { Switch, Text, useTheme } from "react-native-paper";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const imgDir = FileSystem.bundleDirectory + "assets/hobbies/";
// Checks if gif directory exists. If not, creates it

export default function Hobbies() {
  const theme = useTheme();
  const [images, setImages] = useState< {
        title: string;
        data: any[];
    }[]>([]);

  useEffect(() => {
    // Definir las imágenes dentro de tu carpeta de recursos
    const imagePaths = [
      {
        title: 'Viajes',
        data: [
          [require("@/assets/hobbies/IMG_2092.jpeg"),
          require("@/assets/hobbies/IMG_5206.jpeg")],
          [require("@/assets/hobbies/IMG_6292.jpeg"),
          require("@/assets/hobbies/IMG_0266.jpeg")],
        ],
      },
      {
        title: 'Fotografía',
        data: [ [require("@/assets/hobbies/IMG_0037.jpeg"),
          require("@/assets/hobbies/IMG_0549.jpeg")],
          [require("@/assets/hobbies/IMG_9991.jpeg"),
          require("@/assets/hobbies/IMG_8966.jpeg")],
        ],
      }
      // Agrega aquí todas las imágenes que tengas en tu carpeta
    ];

    setImages(imagePaths); // Guardar las rutas de las imágenes
  }, []);

  return (
    <SafeAreaView>
      <Header>
        <Text variant="titleLarge" theme={theme}>
          Hobbies
        </Text>
        <FontAwesome
          name="soccer-ball-o"
          size={24}
          color={theme.colors.onSurface}
        />
      </Header>
      <SectionList
        keyExtractor={(item, index) => "SectionList" + index}
        sections={images}
        renderSectionHeader={({section: {title}}) => (
          <Text   style={{
            fontFamily: "Orbitron_400Regular",
          }} variant="titleLarge">{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={item[0]}
              style={{ width: width / 2, height: 400 }}
            />
            {
              item?.[1] && <Image
                source={item[1]}
                style={{ width: width / 2, height: 400 }}
              />
            }
            
          </View>
        )}
      />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    //borderRadius: 10,
    overflow: "hidden",
    //margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
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
