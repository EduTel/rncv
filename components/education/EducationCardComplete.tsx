import { Experience } from "@/app/(tabs)";
import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
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
        contentContainerStyle={style.containerStyle}
      >
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
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
  },
  map: {
    width: "100%",
    height: "50%",
  },
});
