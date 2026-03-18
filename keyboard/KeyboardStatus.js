import { useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";

export const KeyboardStatus = () => {
  useEffect(() => {
    // Fired when keyboard opens
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      console.log("Keyboard Opened. Height:", e.endCoordinates.height);
    });

    // Fired when keyboard closes
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      console.log("Keyboard Closed. Height: 0");
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>
        Keyboard height: {JSON.stringify(Keyboard.metrics() ?? "Undefined")}
      </Text>
    </View>
  );
};
