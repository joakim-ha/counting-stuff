import { Text, View, StyleSheet } from "react-native";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  countable,
  changeCount,
  index,
  deleteCountable,
}) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={styles.buttonColumn}>
      <CountButton
        text={"+"}
        submit={() => {
          changeCount(1, countable.name);
        }}
      />
      <CountButton
        text={"-"}
        submit={() => {
          if (countable.count > 0) {
            changeCount(-1, countable.name);
          }
        }}
      />
      <CountButton text={"Del"} submit={() => deleteCountable(index)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
});
