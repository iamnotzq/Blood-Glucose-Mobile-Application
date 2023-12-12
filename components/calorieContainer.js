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
    { value: currentProgress, color: "#F8F9FB" }, //current progress
    { value: progressLeft, color: "#9CC0E8" }, //progress left
  ];

  const stackData = Array.from({ length: 5 }).map((_, index) => {
    const historyItem = consumptionHistory[index] || {
      totalCaloriesConsumed: 0,
    };
    const calConsumed = historyItem.totalCaloriesConsumed;
    const calLeft = calGoal - calConsumed;

    return {
      stacks: [
        { value: calConsumed, color: "#3B83D1" }, // calLeft
        { value: calLeft, color: "#9CC0E8" }, // calEaten
      ],
      label: historyItem.dayOfWeek, // Assuming you have a function to get the day label
    };
  });

  return (
    <View>
      {/* Top container */}
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
                /* Replace hardcoded info with implementation */
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
      </View>

      {/* Bottom container */}
      <View style={styles.bottomCalorieContainer}>
        <BarChart
          width={340}
          height={80}
          barWidth={30}
          hideAxesAndRules
          noOfSections={2}
          stackData={stackData}
        />
      </View>
    </View>
  );
};

export default CalorieContainer;

const styles = StyleSheet.create({
  topCalorieContainer: {
    paddingHorizontal: 16,
    height: 150,
    width: 350,
    backgroundColor: "#3B83D1",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
    alignContent: "center",
  },
  bottomCalorieContainer: {
    height: 150,
    width: 350,
    padding: 16,
    backgroundColor: "#F8F9FB",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    color: "#F8F9FB",
    fontSize: 16,
    fontWeight: "500",
  },
  chartContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
