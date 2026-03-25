import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  // KF: StyleSheet for AddRow
  const styles = StyleSheet.create({
    promptColumn: {
      flex: 0.7,
      alignItems: "center",
    },
    buttonColumn: {
      flex: 0.3,
    },
  });

  return (
    <View style={CommonStyles.row}>
      <View style={styles.promptColumn}>
        <TextInput
          placeholder="Enter name"
          value={name} //KF: Clear input after adding
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonColumn}>
        <CountButton
          text="Add"
          submit={() => {
            addNewCountable(name);
            setName(""); //KF: Clear input after adding
          }}
        />
      </View>
    </View>
  );
};
