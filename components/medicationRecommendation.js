import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const MedicationRecommendation = ({
  medicationName,
  maybeConsumptionPeriod,
  units,
  maybeHeaderText,
  handleCirclePress,
}) => {
  const headerText = maybeHeaderText ? maybeHeaderText : "Recommendation";
  const currentTimeStamp = new Date();
  const shortTimestamp = currentTimeStamp.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const consumptionPeriod = maybeConsumptionPeriod
    ? maybeConsumptionPeriod
    : shortTimestamp;

  return (
    <View style={styles.mainContainer}>
      <MaterialCommunityIcons name="pill" size={50} color="#3B83D1" />

      <View style={styles.textContainer}>
        <Text style={styles.mainHeaderText}>{headerText}</Text>
        <View>
          <Text style={styles.medication}>{medicationName}</Text>
          <Text style={styles.period}>{units} units</Text>
          <Text style={styles.period}>{consumptionPeriod}</Text>
        </View>
        <View></View>
      </View>

      <View style={styles.lastColumnContainer}>
        <TouchableOpacity onPress={handleCirclePress}>
          <Ionicons name="checkmark-circle-outline" size={30} color="#29af61" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicationRecommendation;

const styles = StyleSheet.create({
  mainContainer: {
    height: 175,
    width: "90%",
    backgroundColor: "#c4daf1",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  medication: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3B83D1",
  },
  period: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3B83D1",
  },
  lastColumnContainer: {
    paddingVertical: 5,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "800",
  },
  textContainer: {
    height: "70%",
    justifyContent: "center",
    width: "65%",
    justifyContent: "space-between",
  },
});
