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

  // 🎨 färger
  const colors = ["#FFCCCC", "#CCFFCC", "#CCCCFF", "#FFF0B3", "#E0CCFF"];

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const color = colors[countables.length % colors.length];
    const newState = [...countables, { name, count: 0, color }];
    setCountables(newState);
  };

  const removeCountable = (indexToRemove) => {
    const newState = countables.filter((_, index) => index !== indexToRemove);
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

  return (
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
              removeCountable={removeCountable}
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
