import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
