import { StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import FoodDiaryScreen from "./screens/foodDiary/FoodDiaryScreen";

export default function App() {
  return <FoodDiaryScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
