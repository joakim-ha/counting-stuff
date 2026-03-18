import { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Keyboard } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable, existingCountables }) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    const trimmedName = name.trim();

    //1. Check if the name is empty
    if (trimmedName.length === 0) {
      Alert.alert("Invalid name", "Please enter a valid name.");
      return;
    }

    //2. Check if the name already exists
    const nameExists = existingCountables.some(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (nameExists) {
      Alert.alert("Name already exists", "Please enter a different name.");
      return;
    }

    // If all checks pass, add the new countable item
    addNewCountable(trimmedName);
    setName("");

    Keyboard.dismiss();
  };

  return (
    <View style={[CommonStyles.row, styles.container]}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        fontSize={30}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonWrapper}>
        <CountButton text="Add" submit={handleAdd} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  buttonWrapper: {
    minWidth: 80,
    marginLeft: 10,
    height: 80,
  }
});
