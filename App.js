import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CountableRow } from "./components/CountableRow";
import { AddRow } from "./components/AddRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [countables, setCountables] = useState([]);

  const changeCount = (amount, name) => {
    const newState = countables.map((c) => {
      if (c.name === name) {
        return { ...c, count: c.count + amount };
      }
      return c;
    });
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      alert("namnet får int vara tomt!");
      return;
    }
    const exists = countables.some(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (exists) {
      alert("namnet upptaget.");
      return;
    }
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
  };

  const deleteCountable = (index) => {
    const newState = countables.filter((_, i) => i !== index);

    setCountables(newState);
  };

  const isLoaded = useRef(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      isLoaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    saveCountables(countables);
  }, [countables]);

  const sortedCountables = [...countables].sort((a, b) => b.count - a.count);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          {sortedCountables.map((countable, index) => (
            <CountableRow
              countable={countable}
              key={countable.name}
              changeCount={changeCount}
              deleteCountable={deleteCountable}
              index={index}
            />
          ))}
        </ScrollView>
        <AddRow addNewCountable={addNewCountable} />
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
});
