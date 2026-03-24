import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  textItem: {
    fontSize: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightblue",
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
    paddingEnd: 20,
    paddingStart: 20,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightblue",
    borderWidth: 3,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
    backgroundColor: "white",
  },
});
