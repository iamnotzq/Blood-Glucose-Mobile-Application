import { ActivityIndicator, StyleSheet, View } from "react-native";

const Spinner = () => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#3B83D1" />
    </View>
  );
};

export default Spinner;

export const styles = StyleSheet.create({
  spinnerContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
