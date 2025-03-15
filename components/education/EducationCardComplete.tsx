import { Experience } from "@/app/(tabs)/education";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Linking,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import { handlePressLink } from "@/utils/linking";

type EducationCardProp = {
  visible: string;
  setIdEducation: (visible: string) => void;
  data: Experience;
};

const getTechnologyIcon = (technology: string, color: string) => {
  const icons: Record<string, React.JSX.Element> = {
    shell: <MaterialCommunityIcons name="powershell" size={24} color={color} />,
    php: <MaterialCommunityIcons name="language-php" size={24} color={color} />,
    python: (
      <MaterialCommunityIcons name="language-python" size={24} color={color} />
    ),
    javascript: <MaterialIcons name="javascript" size={24} color={color} />,
    ts: (
      <MaterialCommunityIcons
        name="language-typescript"
        size={24}
        color={color}
      />
    ),
    react: <FontAwesome5 name="react" size={24} color={color} />,
    postgresql: (
      <MaterialCommunityIcons name="elephant" size={24} color={color} />
    ),
    mysql: <Fontisto name="mysql" size={24} color={color} />,
    aws: <FontAwesome5 name="aws" size={24} color={color} />,
  };

  return icons[technology.toLowerCase()] || null;
};

export const EducationCardComplete = ({
  visible,
  setIdEducation,
  data,
}: EducationCardProp) => {
  const theme = useTheme();
  const [url, setUrl] = useState("");

  return (
    <Portal>
      <Modal
        visible={visible !== ""}
        onDismiss={() => setIdEducation("")}
        contentContainerStyle={[
          style.containerStyle,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View>
          <TouchableHighlight
            onPress={() => setIdEducation("")}
            underlayColor={theme.colors.background}
          >
            <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
              <AntDesign
                name="closecircleo"
                size={24}
                color={theme.colors.onSurface}
              />
            </View>
          </TouchableHighlight>
          <ScrollView style={{ marginTop: 20 }}>
            <View style={{ paddingHorizontal: 20 }}>
              {data?.company && (
                <Text
                  style={{ alignSelf: "center", fontWeight: "bold" }}
                  variant="headlineSmall"
                  theme={theme}
                >
                  {data?.company}
                </Text>
              )}
              <Button
                icon="microsoft-internet-explorer"
                mode="text"
                onPress={() => handlePressLink(data?.url)}
              >
                {data?.url}
              </Button>
              {data?.position && (
                <Text theme={theme} variant="titleMedium">
                  {data?.position}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {data?.start_date && (
                  <View style={{ flexDirection: "row" }}>
                    <Text theme={theme}>inicio: </Text>
                    <Text theme={theme}>{data?.start_date}</Text>
                  </View>
                )}
                {data?.end_date && (
                  <View style={{ flexDirection: "row" }}>
                    <Text theme={theme}>fin: </Text>
                    <Text theme={theme}>{data?.end_date}</Text>
                  </View>
                )}
              </View>

              {data?.technologies?.length > 0 && (
                <Text theme={theme} variant="titleMedium">
                  technologies:{" "}
                </Text>
              )}
              {data?.technologies?.map?.((data) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {getTechnologyIcon(data, theme.colors.onSurface)}
                    <Text theme={theme}>{data}</Text>
                  </View>
                );
              })}

              {data?.responsibilities?.length > 0 && (
                <Text theme={theme} variant="titleMedium">
                  responsibilities:
                </Text>
              )}
              {data?.responsibilities?.map?.((data) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Octicons
                      name="tasklist"
                      size={24}
                      color={theme.colors.onSurface}
                    />
                    <Text theme={theme}>{data}</Text>
                  </View>
                );
              })}
              {data?.achievements?.length > 0 && (
                <Text theme={theme} variant="titleMedium">
                  {"achievements:"}
                </Text>
              )}
              {data?.achievements?.map?.((data) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Octicons
                      name="tasklist"
                      size={24}
                      color={theme.colors.onSurface}
                    />
                    <Text theme={theme}>{data}</Text>
                  </View>
                );
              })}
              <Text theme={theme} variant="titleMedium">
                {"Location:"}
              </Text>
              <MapView style={style.map}>
                <Marker
                  coordinate={{
                    latitude: data?.location?.lat,
                    longitude: data?.location?.long,
                  }}
                  title={data.company}
                />
              </MapView>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    paddingHorizontal: 0,
    height: "70%",
  },
  map: {
    width: "100%",
    height: 200,
  },
});
