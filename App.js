import { StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import FoodDiaryScreen from "./screens/foodDiary/FoodDiaryScreen";
import NewFoodEntryScreen from "./screens/foodDiary/NewFoodEntryScreen";
import FoodEntryDetailsScreen from "./screens/foodDiary/FoodEntrySummaryScreen";
import StackNavigator from "./navigation/StackNavigator";
import BloodGlucoseRecordsScreen from "./screens/bloodGlucose/BloodGlucoseRecordsScreen";
import NewBloodGlucoseRecordScreen from "./screens/bloodGlucose/NewBloodGlucoseRecordScreen";
import DashboardScreen from "./screens/DashboardScreen";
import UserGlucoseLevelsScreen from "./screens/onboarding/UserGlucoseLevelsScreen";
import BloodGlucoseChartScreen from "./screens/bloodGlucose/BloodGlucoseChartScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import MedicationScreen from "./screens/MedicationScreen";
import AddMedicationScreen from "./screens/AddMedicationScreen";
import HealthcareProviderScreen from "./screens/HealthcareProviderScreen";
import NutritionalDetailsChartScreen from "./screens/NutritionalDetailsChartScreen";
import SettingsScreen from "./screens/SettingsScreen";
// import { DashboardAssets } from "./api/routes/models/responses/dashboardAssets"

export default function App() {
  return <SettingsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
