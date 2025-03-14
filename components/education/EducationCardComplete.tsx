import { Experience } from "@/app/(tabs)";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableHighlight, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

type EducationCardProp = {
  visible: string;
  setIdEducation: (visible: string) => void;
  data: Experience;
};
export const EducationCardComplete = ({
  visible,
  setIdEducation,
  data,
}: EducationCardProp) => {
  const theme = useTheme();

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
        <ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableHighlight
              onPress={() => setIdEducation("")}
              underlayColor={theme.colors.background} // O el mismo color de fondo que uses
            >
              <View style={{ alignSelf: "flex-end", flex: 1 }}>
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color={theme.colors.onSurface}
                />
              </View>
            </TouchableHighlight>
            {data?.company && <Text theme={theme}>{data?.company}</Text>}
            {data?.position && <Text theme={theme}>{data?.position}</Text>}
            {data?.start_date && <Text theme={theme}>{data?.start_date}</Text>}
            {data?.end_date && <Text theme={theme}>{data?.end_date}</Text>}
            {data?.technologies?.map?.((data) => {
              return <Text theme={theme}>{data}</Text>;
            })}

            {data?.responsibilities?.map?.((data) => {
              return <Text theme={theme}>{data}</Text>;
            })}
            <Text theme={theme}>{"achievements"}</Text>
            {data?.achievements?.map?.((data) => {
              return <Text theme={theme}>{data}</Text>;
            })}

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
    height: "50%",
  },
  map: {
    width: "100%",
    height: 200,
  },
});
