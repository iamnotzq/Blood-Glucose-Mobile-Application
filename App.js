import { StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import FoodDiaryScreen from "./screens/foodDiary/FoodDiaryScreen";
import NewFoodEntryScreen from "./screens/foodDiary/NewFoodEntryScreen";
import FoodEntryDetailsScreen from "./screens/foodDiary/FoodEntrySummaryScreen";
import StackNavigator from "./navigation/StackNavigator";
import BloodGlucoseRecordsScreen from "./screens/bloodGlucose/BloodGlucoseRecordsScreen";
import NewBloodGlucoseRecordScreen from "./screens/bloodGlucose/NewBloodGlucoseRecordScreen";

export default function App() {
  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
