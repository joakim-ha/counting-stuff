import { Text, View } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const CountableRow = ({ countable, changeCount, index }) => (
  <View style={CommonStyles.row}>
    <View style={CommonStyles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    {/* Addition Button */}
    <View style={CommonStyles.buttonColumn}>
      <View style={CommonStyles.buttonAddition}>
        <CountButton
          text={"+"}
          submit={() => {
            changeCount(1, index);
          }}
        />
      </View>
      {/* Subtraction  Button */}
      <View style={CommonStyles.buttonSubtraction}>
        <CountButton
          text={"-"}
          submit={() => {
            changeCount(-1, index);
          }}
        />
      </View>
    </View>
  </View>
);
