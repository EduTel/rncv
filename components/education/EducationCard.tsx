import { TouchableHighlight, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";

export const EducationCard = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  return (
    <View
      style={
        index % 2 === 1
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" }
      }
    >
      <Shadow
        distance={15}
        startColor={"#eb9066d8"}
        endColor={"#ff00ff10"}
        offset={[3, 4]}
      >
        <TouchableHighlight
          underlayColor="#fff" // O el mismo color de fondo que uses
          onPress={() => {}}
          style={styles.itemContainer}
        >
          <>
            <Text variant="titleMedium">{item.company}</Text>
            <Text variant="bodySmall">{item.position}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text variant="bodySmall">{item.start_date}</Text>
              <Text variant="bodySmall">{item.end_date}</Text>
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
});
