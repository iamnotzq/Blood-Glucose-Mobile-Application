import { StyleSheet, Text, View } from "react-native";
import { PieChart, BarChart } from "react-native-gifted-charts";
import CalorieText from "./calorieText";
import React from "react";

const CalorieContainer = () => {
  const pieData = [
    { value: 30, color: "#F8F9FB" },
    { value: 70, color: "#9CC0E8" },
  ];
  const stackData = [
    {
      stacks: [
        { value: 1500, color: "#3B83D1" },
        { value: 500, color: "#9CC0E8" },
      ],
      label: "Mon",
    },
    {
      stacks: [
        { value: 1680, color: "#3B83D1" },
        { value: 320, color: "#9CC0E8" },
      ],
      label: "Tue",
    },
    {
      stacks: [
        { value: 2000, color: "#3B83D1" },
        { value: 0, color: "#9CC0E8" },
      ],
      label: "Wed",
    },
    {
      stacks: [
        { value: 1898, color: "#3B83D1" },
        { value: 102, color: "#9CC0E8" },
      ],
      label: "Thu",
    },
    {
      stacks: [
        { value: 500, color: "#3B83D1" },
        { value: 1500, color: "#9CC0E8" },
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
          <CalorieText text="Eaten" calories={500} />
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
          <CalorieText text="Left" calories={1500} />
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
