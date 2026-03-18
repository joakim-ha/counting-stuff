import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export function InsetPrinter() {
  const insets = useSafeAreaInsets();

  console.log("All Insets:", insets);

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <Text>SafeArea: {JSON.stringify(insets)}</Text>
    </View>
  );
}
