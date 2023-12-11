import { StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import FoodDiaryScreen from "./screens/foodDiary/FoodDiaryScreen";
import NewFoodEntryScreen from "./screens/foodDiary/NewFoodEntryScreen";
import FoodEntryDetailsScreen from "./screens/foodDiary/FoodEntryDetailsScreen";

export default function App() {
  return <FoodEntryDetailsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
