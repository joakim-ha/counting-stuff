import { useState } from "react";
import { View, TextInput, Keyboard, Text } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable, countables }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Namnet kan inte vara tomt.");
      return;
    }
    if (countables.some(c => c.name === trimmedName)) {
      setError("Namnet finns redan.");
      return;
    }
    addNewCountable(trimmedName);
    setName("");
    setError("");
    Keyboard.dismiss();
  };

  return (
    <View style={CommonStyles.row}>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error) setError("");
        }}
        style={{ flex: 1, fontSize: 40 }}
      />
      {error ? <Text style={{ color: "red", fontSize: 20 }}>{error}</Text> : null}
      <CountButton
        text="Add"
        submit={handleAdd}
      />
    </View>
  );
};;
