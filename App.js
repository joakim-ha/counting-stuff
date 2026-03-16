import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    if (!name) return; //kan inte lägga till en blank

    const isDuplicate = countables.some((countable) => countable.name === name);
    if (isDuplicate) return; //kan inte lägga till en med samma namn
    const newState = [...countables, { name, count: 0 }];
    setCountables(newState);
    Keyboard.dismiss(); //stänger tangentbordet efter submit
  };
  //ta bort en countable
  const deleteCountable = (index) => {
    const newState = [...countables];
    newState.splice(index, 1);
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
              index={index}
              deleteCountable={deleteCountable}
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
