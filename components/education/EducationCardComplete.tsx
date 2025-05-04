import { Experience } from "@/app/(tabs)/education";
import { useCallback, useContext, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Linking,
  View,
} from "react-native";
import MapView, { Marker, Camera } from "react-native-maps";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import { handlePressLink } from "@/utils/linking";
import { ThemeContext } from "@/app/_layout";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const theme = useTheme();
  const [url, setUrl] = useState("");
  const mapRef = useRef<MapView>(null);
  const [zoomLevel, setZoomLevel] = useState(0.01);
  const { isDarkMode } = useContext(ThemeContext);

  const handlePressAnimateToRegion = useCallback((mapRef: React.RefObject<MapView>, latitudeDelta: number,longitudeDelta: number ) => {
    mapRef?.current?.animateToRegion?.(
      {
        latitude: data?.location?.lat,
        longitude: data?.location?.long,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      300
    );
  }, [data?.location?.lat, data?.location?.long,]);
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
          <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
            <View>
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
                  marginLeft: 20,
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
                <Text
                  theme={theme}
                  variant="titleMedium"
                  style={{ marginVertical: 10 }}
                >
                  Technologies:
                </Text>
              )}
              {data?.technologies?.map?.((data, index) => {
                return (
                  <View style={style.list} key={"Technologies"+index}>
                    {getTechnologyIcon(data, theme.colors.onSurface)}
                    <Text theme={theme}>{data}</Text>
                  </View>
                );
              })}

              {data?.responsibilities?.length > 0 && (
                <Text
                  theme={theme}
                  variant="titleMedium"
                  style={{ marginVertical: 10 }}
                >
                  Responsibilities:
                </Text>
              )}
              {data?.responsibilities?.map?.((data, index) => {
                return (
                  <View style={style.list} key={"Responsibilities"+index}>
                    <Octicons
                      name="tasklist"
                      size={24}
                      color={theme.colors.onSurface}
                    />
                    <Text style={{flex: 1, flexWrap: 'wrap'}} theme={theme}>{data}</Text>
                  </View>
                );
              })}
              {data?.achievements?.length > 0 && (
                <Text
                  theme={theme}
                  variant="titleMedium"
                  style={{ marginVertical: 10 }}
                >
                  Achievements:
                </Text>
              )}
              {data?.achievements?.map?.((data, index) => {
                return (
                  <View style={style.list} key={"Achievements"+index}>
                    <Octicons
                      name="tasklist"
                      size={24}
                      color={theme.colors.onSurface}
                    />
                    <Text style={{flex: 1, flexWrap: 'wrap'}} theme={theme}>{data}</Text>
                  </View>
                );
              })}
              {data?.location?.lat && <View>
                <View
                    style={style.btnZoomContainer}
                  >
                  <Text
                    theme={theme}
                    variant="titleMedium"
                    style={{ marginVertical: 10 }}
                  >
                    {"Location:"}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems:'center'}}>
                    <TouchableHighlight
                      onPress={() => {
                        const latitudeDelta = zoomLevel * 0.5;
                        const longitudeDelta = zoomLevel * 0.5;
                        handlePressAnimateToRegion(mapRef, latitudeDelta, longitudeDelta);
                        setZoomLevel(latitudeDelta);
                      }}
                      underlayColor={theme.colors.surfaceVariant}
                    >
                      <AntDesign
                        name="plus"
                        size={24}
                        color={theme.colors.onSurface}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        const latitudeDelta = zoomLevel / 0.5;
                        const longitudeDelta = zoomLevel / 0.5;
                        handlePressAnimateToRegion(mapRef,latitudeDelta,longitudeDelta)
                        setZoomLevel(latitudeDelta);
                      }}
                      underlayColor={theme.colors.surfaceVariant}
                    >
                    <AntDesign
                        name="minus"
                        size={24}
                        color={theme.colors.onSurface}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
                <MapView
                  userInterfaceStyle={isDarkMode? 'dark': 'light'}
                  ref={mapRef}
                  style={style.map}
                  initialRegion={{
                    latitude: data?.location?.lat,
                    longitude: data?.location?.long,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: data?.location?.lat ?? 0,
                      longitude: data?.location?.long ?? 0,
                    }}
                    title={data.company}
                  />
                </MapView>
              </View>}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  btnZoomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  list: {
    flexDirection: "row",
    //alignItems: "center",
    gap: 10,
    marginLeft: 20,
  },
});
