import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserParticularsScreen from "./screens/onboarding/UserParticularsScreen";
import UserMeasurementsScreen from "./screens/onboarding/UserMeasurementsScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import UserDiabetesScreen from "./screens/onboarding/UserDiabetesScreen";
import StackNavigator from "./navigation/StackNavigator";

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
