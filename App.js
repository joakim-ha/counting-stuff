import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CountableRow } from "./components/CountableRow";
import { AddRow } from "./components/AddRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [countables, setCountables] = useState([]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    newState.sort((a, b) => b.count - a.count);
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const newState = [...countables, { name, count: 0 }];
    newState.sort((a, b) => b.count - a.count);
    setCountables(newState);
  };

  const deleteCountable = (index) => {
    const newState = [...countables];
    newState.splice(index, 1);
    setCountables(newState);
  };

  const editCountableName = (newName, index) => {
    const trimmedName = newName.trim();

    if (trimmedName.length === 0) {
      Alert.alert("Invalid name", "Please enter a valid name.");
      return;
    }

    const newState = [...countables];
    newState[index].name = trimmedName;
    setCountables(newState);
  };

  const isLoaded = useRef(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result || []);
      isLoaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    saveCountables(countables);
  }, [countables]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={[styles.scrollContent, countables.length === 0 && styles.emptyScroll]}>
          {countables.length > 0 ? (
            countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                deleteCountable={deleteCountable}
                editCountableName={editCountableName}
                index={index}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nothing To Count Yet!</Text>
            </View>
          )}
        </ScrollView>
        <AddRow addNewCountable={addNewCountable}
                existingCountables={countables}
                deleteCountable={deleteCountable}
                editCountableName={editCountableName}
         />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyScroll: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});
