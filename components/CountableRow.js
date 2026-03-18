import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index, deleteCountable, editCountableName }) => {
  
  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${countable.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", 
          onPress: () => deleteCountable(index) }
      ]
    );
  };


  const handleEdit = () => {
    Alert.prompt(
      "Edit Name",
      "Enter a new name for the countable item:",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Save", 
          onPress: (newName) => editCountableName(newName, index) 
        }
      ],
      "plain-text",
      countable.name
    );
  };

  return (
    <View style={[CommonStyles.row, styles.rowAdjustment]}>

      <View style={styles.leftActions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
        >
          <Text style={styles.buttonText}>DELETE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nameColumn}>
        <Text style={styles.nameText} numberOfLines={1}>{countable.name}</Text>
        <Text style={styles.countText}>{countable.count}</Text>
      </View>

      <View style={styles.buttonColumn}>
        <CountButton text="+" submit={() => changeCount(1, index)} />
        <CountButton 
          text="-" 
          submit={() => changeCount(-1, index)} 
          disabled={countable.count <= 0} 
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  actionColumn: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    width:60,
    alignItems: "center",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    padding: 10,
    width: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  nameColumn: {
    flex: 1,
    alignItems: "center",
  },
  nameText: {
    fontSize: 30,
    color: "#333",
  },
  countText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
});
