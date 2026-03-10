import { Text, View, StyleSheet } from "react-native";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  countable,
  changeCount,
  removeCountable,
  index,
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
          changeCount(1, index);
        }}
      />
      <CountButton
        text={"-"}
        submit={() => {
          changeCount(-1, index);
        }}
      />
      <CountButton
        text={"💀"}
        submit={() => {
          removeCountable(index);
        }}
      />
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
