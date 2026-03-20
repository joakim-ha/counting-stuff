import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard
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
  const trimmedName = name.trim();
  // förhindrar att två objekt kan ha samma namn
  if (!trimmedName || countables.some(c => c.name.toLowerCase() === trimmedName.toLowerCase())) {
    return;
  }
  const newState = [...countables, { name: trimmedName, count: 0 }];
  setCountables(newState);
  Keyboard.dismiss(); // tar ner tangenbordet
 };

 // ta bort ett objekt
 const removeCountable = (index) => {
  setCountables((prev) => {
    const newState = [...prev];
    newState.splice(index, 1);
    return newState;
  });
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
    // alternativ vy när listan är tom
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
       <ScrollView>
        {countables.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 100, fontSize: 18 }}>Nothing to count</Text>) : 
        (countables.map((countable, index) => (
          <CountableRow
            countable={countable}
            key={countable.name}
            changeCount={changeCount}
            index={index}
            removeCountable={() => removeCountable(index)}
      />
    ))
  )}
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
