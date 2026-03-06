import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { CountablesView } from "./components/CountablesView";
import { CountableProvider } from "./contexts/CountableContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CountableProvider>
        <CountablesView />
      </CountableProvider>
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
