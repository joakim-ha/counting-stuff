import { Text, View, StyleSheet, Alert, TextInput } from "react-native";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";
import { useState } from "react";





export const CountableRow = ({ countable, changeCount, removeCountable, editCountableName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(countable.name);
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => removeCountable(countable.name) },
    ]);
  };
  const handleSave = () => {
    editCountableName(countable.name, newName);
    setIsEditing(false);
  };

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        {isEditing ? (
          <TextInput
            value={newName}
            onChangeText={setNewName}
            style={[
              styles.input,
              isEditing && styles.editingInput
            ]}
          />
        ) : (
          <Text style={CommonStyles.textItem}>{countable.name}</Text>
        )}
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>

      <View style={styles.buttonColumn}>
        <CountButton
          text="+"
          submit={() => changeCount(1, countable.name)}
        />
        <CountButton
          text="-"
          submit={() => changeCount(-1, countable.name)}
          disabled={countable.count === 0}
        />
      </View>

      <View style={styles.editColumn}>
        <CountButton
          text={isEditing ? "Save" : "Edit"}
          textStyle={{ fontSize: 20, color: "#555" }}
          style={styles.buttonFullWidth}
          submit={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        />

        {isEditing && (
          <>
            <CountButton
              text="Cancel"
              textStyle={{ fontSize: 20, color: "#555" }}
              style={styles.buttonFullWidth}
              submit={() => {
                setNewName(countable.name);
                setIsEditing(false);
              }}
            />

            <CountButton
              text="Delete"
              textStyle={{ fontSize: 20, color: "red" }}
              style={styles.buttonFullWidth}
              submit={handleDelete}
            />
          </>
        )}
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.6,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  buttonColumn: {
    flex: 0.25,
    justifyContent: "center",
  },
  deleteColumn: {
    flex: 0.15,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    width: "100%",
    fontSize: 20,
  },
  editingInput: {
    fontSize: 16,
    padding: 8,
  },
  editColumn: {
    width: 100,
    alignItems: "stretch",
    justifyContent: "center",
    gap: 2,
    paddingLeft: 10
  },
  buttonFullWidth: {
    width: "100%",
  }



});