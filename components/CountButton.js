import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

export const CountButton = ({ text, submit, disabled, textSize = 60 }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]} 
    onPress={submit} 
    disabled={disabled}
    >
    <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
});
