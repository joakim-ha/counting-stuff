import { useState } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={[CommonStyles.row, { alignItems: "center, gap: 10" }]}>
      <TextInput
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderColor: "lightblue",
          padding: 8,
        }}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <CountButton
        text="Add"
        submit={() => {
          addNewCountable(name);
          setName("");
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};
