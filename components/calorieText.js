import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CalorieText = ({ text, calories }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>{text}</Text>
      <View style={styles.calorieContainer}>
        <Text style={styles.caloriesText}>{calories}</Text>
        <Text> </Text>
        <Text style={styles.kcalText}>kcal</Text>
      </View>
    </View>
  );
};

export default CalorieText;

const styles = StyleSheet.create({
  mainContainer: {
    height: 85,
    justifyContent: "center",
  },
  headerText: {
    color: "#F8F9FB",
    fontSize: 28,
    fontWeight: "800",
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  caloriesText: {
    color: "#F8F9FB",
    fontSize: 24,
    fontWeight: "900",
  },
  kcalText: {
    color: "#F8F9FB",
    fontSize: 22,
    fontWeight: "400",
  },
});
