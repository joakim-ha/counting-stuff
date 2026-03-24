import { useState } from "react";
import { View, TextInput } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    addNewCountable(name);
    setName("");
  };

  return (
    <View style={CommonStyles.addRow}>
      <TextInput
        style={CommonStyles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <CountButton text="Add" submit={handleAdd} />
    </View>
  );
};
