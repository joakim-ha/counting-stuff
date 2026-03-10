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
    <View style={CommonStyles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={CommonStyles.buttonColumn}>
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
