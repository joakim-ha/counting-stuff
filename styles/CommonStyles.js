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
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
  entryColumn: {
    flex: 0.7,
    alignItems: "center",
  },
  addColumn: {
    flex: 0.3,
  },
});
