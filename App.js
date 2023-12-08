import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import DashboardScreen from "./screens/DashboardScreen";
import MenuScreen from "./screens/MenuScreen";
import GlucoseContainer from "./components/glucoseContainer";
import FoodDiaryScreen from "./screens/foodDiary/FoodDiaryScreen";

export default function App() {
  // return <StackNavigator />;
  // return <DashboardScreen />;
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
