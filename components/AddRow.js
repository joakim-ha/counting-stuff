import { useState } from "react";
import { TextInput, View } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <TextInput
        style={CommonStyles.input}
        placeholder="Enter name"
        onChangeText={setName}
      />
      <View style={CommonStyles.buttonAddition}>
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
