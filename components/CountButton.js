import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

// KF: Button may be disabled
export const CountButton = ({ text, submit, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={disabled ? undefined : submit}
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
    backgroundColor: "gray",
    opacity: 0.5,
  },
});
