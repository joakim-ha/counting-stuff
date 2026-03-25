import AsyncStorage from "@react-native-async-storage/async-storage";

// KF: Reset Storage  for countables
export const resetCountables = async () => {
  await AsyncStorage.clear();
};

export const saveCountables = async (countables) => {
  await AsyncStorage.setItem("countables", JSON.stringify(countables));
};

export const loadCountables = async () => {
  const result = await AsyncStorage.getItem("countables");
  return result ? JSON.parse(result) : [];
};
