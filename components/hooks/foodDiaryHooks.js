import { View, StyleSheet, Text } from "react-native";

export const displayEntries = (entries) => {
  if (entries.length === 0) {
    return (
      <View>
        <Text style={styles.foodEntryText}>No entries for today</Text>
      </View>
    );
  }

  return entries.map((entry, index) => {
    return (
      <View style={styles.foodEntryContainer}>
        <Text style={styles.foodEntryText}>{entry.description}</Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  foodEntryContainer: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  foodEntryText: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
