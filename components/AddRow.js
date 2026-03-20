import { useState } from "react";
import { View, TextInput } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  // töm textinput efter att ha lagt till ett objekt
  const handleAdd = () => {
    if (name.trim().length > 0) {
      addNewCountable(name);
      setName("");
    }
  };

  return (

    // förbättrade layouten i AddRow
    <View style={[CommonStyles.row, { alignItems: 'center', gap: 10 }]}>
      <TextInput
        style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8 }}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <CountButton
        text="Add"
        submit={handleAdd}
        // förhindra skapandet av objekt med tomma namn
        disabled={!name.trim()}
      />
    </View>
  );
};
