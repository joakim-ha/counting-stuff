import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CountableRow } from "./components/CountableRow";
import { AddRow } from "./components/AddRow";
import {
  resetCountables,
  loadCountables,
  saveCountables,
} from "./storage/CountableStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [countables, setCountables] = useState([]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  // KF: Check for empty name
  const addNewCountable = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("Enter a name", "Name cannot be empty.");
      return;
    }

    // KF:Check duplicate names
    const duplicate = countables.some(
      (entry) => entry.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (duplicate) {
      Alert.alert("Duplicate name", `"${trimmed}" already exists.`);
      return;
    }

    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };

  // KF: delete row when swiping right
  const deleteCountable = (index) => {
    setCountables((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const isLoaded = useRef(false);

  useEffect(() => {
    // resetCountables();
    loadCountables().then((result) => {
      setCountables(result);
      isLoaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    saveCountables(countables);
  }, [countables]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                index={index}
                onDelete={deleteCountable}
              />
            ))}
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
