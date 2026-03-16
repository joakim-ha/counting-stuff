import { Text, View, StyleSheet, Button } from "react-native";
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
    <Button title="Ta bort" onPress={() => deleteCountable(index)} />
    <View style={styles.buttonColumn}>
      <CountButton
        text={"+"}
        submit={() => {
          changeCount(1, index);
        }}
      />
      {countable.count > 0 && (
        <CountButton
          text={"-"}
          submit={() => {
            changeCount(-1, index);
          }}
        />
      )}
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
