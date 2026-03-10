import { useState } from "react";
import { View, TextInput } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <View style={CommonStyles.nameColumn}>
        <TextInput placeholder="Enter name" onChangeText={setName} />
      </View>
      <View style={CommonStyles.buttonColumn}>
        <CountButton
          text="Add"
          submit={() => {
            addNewCountable(name);
          }}
        />
      </View>
    </View>
  );
};
