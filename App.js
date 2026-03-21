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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [KAVHeightCompensation, setKAVHeightCompensation] = useState(true);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    if (newState[index].count < 0) {
      newState[index].count = 0;
    }
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const exists = countables.some((item) => item.name === name);
    const empty = name === "";
    if (exists) {
      alert("That name already exists, choose another.");
    }
    if (empty) {
      alert("Empty name not allowed");
    }
    if (!exists && !empty) {
      const newState = [...countables, { name, count: 0 }];
      setCountables(newState);
    }
  };

  const removeCountable = (index) => {
    setCountables(countables.filter((_, i) => i !== index));
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

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKAVHeightCompensation(true);
      console.log(true);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", (e) => {
      setKAVHeightCompensation(false);
      console.log(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containerSAV}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled={KAVHeightCompensation}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          style={styles.containerKAV}
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
          <StatusBar style="auto" />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  containerSAV: {
    backgroundColor: "#76ff9fa4",
    flex: 1,
  },
  containerKAV: {
    backgroundColor: "#00d9ffa4",
    flex: 1,
  },
});
