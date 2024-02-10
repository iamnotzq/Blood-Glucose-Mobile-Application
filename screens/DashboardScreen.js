import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import CalorieContainer from "../components/calorieContainer";
import GlucoseContainer from "../components/glucoseContainer";
import CommonLayout from "./CommonLayout";
import { getDashboardAssets } from "../hooks/apiHooks";
import Spinner from "../components/spinner";

const DashboardScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { dashboardData, loading } = getDashboardAssets(id, navigation);

  if (loading) {
    return <Spinner />;
  }

  const calorieDisplayAssets = dashboardData?.calorieDisplayAssets || {};
  const bloodGlucoseDisplayAssets =
    dashboardData?.bloodGlucoseDisplayAssets || {};
  const currentBloodGlucoseLevel = bloodGlucoseDisplayAssets.latestMeasurement;

  const displayGlucoseReminder = () => {
    if (currentBloodGlucoseLevel === 0) {
      return (
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>
            Remember to take your initial blood glucose measurement!
          </Text>
        </View>
      );
    }

    return;
  };

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainHeaderContainer}>
          <Text style={styles.mainHeaderText}>Dashboard</Text>
        </View>
        {displayGlucoseReminder()}

        <TouchableOpacity
          style={styles.component}
          onPress={() =>
            navigation.navigate("NutritionalDetailsChart", { id: id })
          }
        >
          {calorieDisplayAssets && (
            <CalorieContainer data={calorieDisplayAssets} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.component}
          onPress={() => navigation.navigate("BloodGlucoseChart", { id: id })}
        >
          {bloodGlucoseDisplayAssets && (
            <GlucoseContainer data={bloodGlucoseDisplayAssets} />
          )}
        </TouchableOpacity>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  mainHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E8EBF2",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  headerText: {
    marginTop: 16,
    marginLeft: 32,
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "500",
  },
  reminderContainer: {
    padding: 16,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDE74C",
    borderColor: "#F9CA24",
    borderWidth: 3,
    borderRadius: 16,
  },
  reminderText: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  component: {
    width: "90%",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },
  containerText: {
    color: "#F8F9FB",
    fontSize: 12,
    fontWeight: "500",
  },
});
