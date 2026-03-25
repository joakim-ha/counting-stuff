import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { validateNewBirdName } from "./components/InputValidation";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import { CommonStyles } from "./styles/CommonStyles";

export default function App() {
  const [countables, setCountables] = useState([]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const error = validateNewBirdName(countables, name);

    if (error) {
      Alert.alert("Invalid input: ", error);
      return;
    }

    const cleanBirdName = name.trim();
    const newState = [...countables, { name: cleanBirdName, count: 0 }];
    setCountables(newState);
    return true;
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
    <SafeAreaView style={CommonStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={CommonStyles.container}
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
