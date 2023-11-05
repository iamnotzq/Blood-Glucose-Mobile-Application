import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import DashboardScreen from "./screens/DashboardScreen";

export default function App() {
  // return <StackNavigator />;
  return <DashboardScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
