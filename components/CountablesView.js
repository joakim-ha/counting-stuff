import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useContext } from "react";
import { CountableRow } from "./CountableRow";
import { AddRow } from "./AddRow";
import { CountableContext } from "../contexts/CountableContext";

export const CountablesView = () => {
  const { countables } = useContext(CountableContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        {countables.map((countable, index) => (
          <CountableRow
            countable={countable}
            key={countable.name}
            index={index}
          />
        ))}
      </ScrollView>
      <AddRow />
    </KeyboardAvoidingView>
  );
};
