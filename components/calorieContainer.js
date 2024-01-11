import { StyleSheet, Text, View } from "react-native";
import { PieChart, BarChart } from "react-native-gifted-charts";
import CalorieText from "./calorieText";
import React from "react";

const CalorieContainer = ({ data }) => {
  const currentProgress = data.dailyProgress;
  const currentProgressPercent = currentProgress * 100;
  const progressLeft = 1 - currentProgress;
  const calEaten = data.calEaten;
  const calLeft = data.calLeft;
  const calGoal = data.calGoal;
  const consumptionHistory = data.consumptionHistory;

  const pieData = [
    { value: currentProgress, color: "#F8F9FB" },
    { value: progressLeft, color: "#9CC0E8" },
  ];

  const stackData = Array.from({ length: 5 }).map((_, index) => {
    const historyItem = consumptionHistory[index] || {
      totalCaloriesConsumed: 0,
    };
    const calConsumed = historyItem.totalCaloriesConsumed;
    const calLeft = calGoal - calConsumed < 0 ? calGoal : calGoal - calConsumed;

    return {
      stacks: [
        { value: calConsumed, color: "#3B83D1" },
        { value: calLeft, color: "#9CC0E8" },
      ],
      label: historyItem.dayOfWeek,
    };
  });

  return (
    <View style={styles.topCalorieContainer}>
      <Text style={styles.containerText}>Calories</Text>
      <View style={styles.chartContainer}>
        <CalorieText text="Eaten" calories={calEaten} />
        <PieChart
          donut
          radius={55}
          backgroundColor="#3B83D1"
          innerRadius={40}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#F8F9FB",
                }}
              >
                {currentProgressPercent}%
              </Text>
            );
          }}
        />
        <CalorieText text="Left" calories={calLeft} />
      </View>

      <View></View>
    </View>
  );
};

export default CalorieContainer;

const styles = StyleSheet.create({
  topCalorieContainer: {
    paddingHorizontal: 16,
    height: 250,
    width: 350,
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  containerText: {
    color: "#F8F9FB",
    fontSize: 32,
    fontWeight: "700",

  },
  chartContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
