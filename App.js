import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
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
    if(newState[index].count < 0) {
      newState[index].count = 0
    } else{
    setCountables(newState);
    }
  };

  const addNewCountable = (name) => {
    if(name.trim() === ""){
      alert("fältet är tomt");
      return;
    }
    const exists = countables.some(
      (countable) => countable.name === name
    )
    if(exists){
      alert("Denna countable finns redan!");
      return;
    }
    const newState = [...countables, { name, count: 0 }];
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
