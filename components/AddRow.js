import { useState, useContext } from "react";
import { View, TextInput } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";
import { CountableContext } from "../contexts/CountableContext";

export const AddRow = () => {
  const [name, setName] = useState("");
  const countableContext = useContext(CountableContext);

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" onChangeText={setName} />
      <CountButton
        text="Add"
        submit={() => {
          countableContext.addNewCountable(name);
        }}
      />
    </View>
  );
};
