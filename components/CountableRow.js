import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index, onDelete }) => (
  <Swipeable
    renderLeftActions={() => (
      <TouchableOpacity style={styles.delete} onPress={() => onDelete(index)}>
        <Text style={CommonStyles.textItem}>Delete</Text>
      </TouchableOpacity>
    )}
  >
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        <Text style={CommonStyles.textItem}>{countable.name}</Text>
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <CountButton
          text={"+"}
          submit={() => {
            changeCount(1, index);
          }}
        />
        <CountButton
          text={"-"}
          submit={() => {
            changeCount(-1, index);
          }}
          disabled={countable.count <= 0} // KF: Button may be disabled
        />
      </View>
    </View>
  </Swipeable>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
  delete: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 5,
  },
});
