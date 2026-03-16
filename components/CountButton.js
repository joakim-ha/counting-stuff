import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

export const CountButton = ({ text, submit, disabled = false }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={submit}
    disabled={disabled}
  >
    <Text style={CommonStyles.textItem}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "lightgray",
  },
});
