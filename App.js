import { StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  // return <StackNavigator />;
  // return <DashboardScreen />;
  return <ProfileScreen />;
  // return <Menu />;
  // return <Test />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
