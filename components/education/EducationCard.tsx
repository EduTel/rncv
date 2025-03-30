import { Experience } from "@/app/(tabs)/education";
import { TouchableHighlight, View, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme, withTheme } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// Get screen dimensions
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45; // 45% of screen width

type EducationCardProp = {
  item: Experience;
  index: number;
  setIdEducation: (visible: string) => void;
};
export const EducationCard = ({
  item,
  index,
  setIdEducation,
}: EducationCardProp) => {
  const theme = useTheme();

  return (
    <View
      style={[
        index % 2 === 1
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" },
      ]}
    >
      <Shadow distance={5} startColor={theme.colors.background} offset={[3, 4]}>
        <TouchableHighlight
          underlayColor={theme.colors.background} // O el mismo color de fondo que uses
          onPress={() => {
            setIdEducation(item.id.toString());
          }}
          style={[
            styles.itemContainer,
            { backgroundColor: theme.colors.background, width: CARD_WIDTH },
          ]}
        >
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                variant="titleMedium"
                theme={theme}
                style={{ fontFamily: "Orbitron_400Regular" }}
              >
                {item.company}
              </Text>
              <FontAwesome5
                name="hand-pointer"
                color={theme.colors.onSurface}
              />
            </View>

            <Text
              variant="bodySmall"
              theme={theme}
              style={{ fontFamily: "Orbitron_400Regular" }}
            >
              {item.position}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                variant="bodySmall"
                theme={theme}
                style={{ fontFamily: "Orbitron_400Regular" }}
              >
                {` ${item.start_date} - ${item.end_date}`}
              </Text>
            </View>
          </>
        </TouchableHighlight>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  locationStart: {
    width: 100,
    height: 100,
    opacity: 1,
  },
  itemContainer: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
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
});
