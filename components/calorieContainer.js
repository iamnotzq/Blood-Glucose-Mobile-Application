import { StyleSheet, Text, View } from "react-native";
import { PieChart, BarChart } from "react-native-gifted-charts";
import CalorieText from "./calorieText";
import React from "react";

const CalorieContainer = ({ data }) => {
  console.log(`Data in Calorie Container: ${data}`);
  const currentProgress = data.dailyProgress;
  const progressLeft = 100 - currentProgress;
  const calEaten = data.calEaten;
  const calLeft = data.calLeft;
  const dailyGoal = data.dailyGoal;
  const consumptionHistory = data.consumptionHistory;

  const pieData = [
    { value: currentProgress, color: "#F8F9FB" }, //current progress
    { value: progressLeft, color: "#9CC0E8" }, //progress left
  ];
  const stackData = [
    {
      stacks: [
        { value: consumptionHistory[0], color: "#3B83D1" }, //calLeft
        { value: dailyGoal - consumptionHistory[0], color: "#9CC0E8" }, //calEaten
      ],
      label: "Mon",
    },
    {
      stacks: [
        { value: consumptionHistory[1], color: "#3B83D1" },
        { value: dailyGoal - consumptionHistory[1], color: "#9CC0E8" },
      ],
      label: "Tue",
    },
    {
      stacks: [
        { value: consumptionHistory[2], color: "#3B83D1" },
        { value: dailyGoal - consumptionHistory[2], color: "#9CC0E8" },
      ],
      label: "Wed",
    },
    {
      stacks: [
        { value: consumptionHistory[3], color: "#3B83D1" },
        { value: dailyGoal - consumptionHistory[3], color: "#9CC0E8" },
      ],
      label: "Thu",
    },
    {
      stacks: [
        { value: consumptionHistory[4], color: "#3B83D1" },
        { value: dailyGoal - consumptionHistory[4], color: "#9CC0E8" },
      ],
      label: "Today",
    },
  ];
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
                  25%
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
