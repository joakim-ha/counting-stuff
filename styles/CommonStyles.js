import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  textItem: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 7,
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
    paddingTop: 10,
    justifyContent: "space-between",
  },
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
    paddingBottom: 10,
  },
  buttonAddition: {
    backgroundColor: "green",
    borderRadius: 5,
    borderWidth: 2,
    margin: 5,
    alignItems: "center",
  },
  buttonSubtraction: {
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 2,
    margin: 5,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    borderRadius: 5,
    fontSize: 40,
    margin: 5,
    alignItems: "center",
  },
  input: {
    borderRadius: 5,
    fontSize: 30,
    margin: 5,
    alignItems: "center",
  },
});
