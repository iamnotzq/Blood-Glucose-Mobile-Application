import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import React from "react";

const GlucoseContainer = ({ data }) => {
  const latestMeasurement = data.latestMeasurement;
  const previousMeasurement = data.previousMeasurement;
  const averageMeasurement = data.averageMeasurement;
  const measurementHistory = data.measurementHistory;

  const lineData = [
    { value: measurementHistory[0], label: "Mon" },
    { value: measurementHistory[1], label: "Tue" },
    { value: measurementHistory[2], label: "Wed" },
    { value: measurementHistory[3], label: "Thu" },
    { value: measurementHistory[4], label: "Today" },
  ];

  return (
    <View>
      <View style={styles.topGlucoseContainer}>
        <View style={styles.latestMeasurementContainer}>
          <View>
            <Text style={styles.glucoseText}>Glucose</Text>
            <Text style={styles.subText}>Latest Measurement</Text>
          </View>

          <View>
            <View style={styles.numberAndUnitsContainer}>
              <Text style={styles.glucoseNumber}>{latestMeasurement}</Text>
              <Text> </Text>
              <Text style={styles.glucoseUnitsText}>mg/dL</Text>
            </View>

            <View>
              <Text style={styles.glucoseRangeText}>Acceptable</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.lastAndAverageContainer}>
          <View style={styles.textAndCirlceContainer}>
            <Text style={styles.topCircleText}>Last Scan</Text>
            <View style={styles.lastScanContainer}>
              <Text style={styles.circleNumberText}>{previousMeasurement}</Text>
              <Text style={styles.circleUnitText}>mg/dL</Text>
            </View>
          </View>

          <View style={styles.textAndCirlceContainer}>
            <Text style={styles.topCircleText}>Average</Text>
            <View style={styles.averageContainer}>
              <Text style={styles.circleNumberText}>{averageMeasurement}</Text>
              <Text style={styles.circleUnitText}>mg/dL</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomGlucoseContainer}>
        <LineChart
          height={80}
          yAxisOffset={115}
          hideAxesAndRules
          data={lineData}
          color="#F8F9FB"
          textColor="#F8F9FB"
          dataPointsColor="#F8F9FB"
        />
      </View>
    </View>
  );
};

export default GlucoseContainer;

const styles = StyleSheet.create({
  topGlucoseContainer: {
    paddingHorizontal: 16,
    height: 150,
    width: 350,
    backgroundColor: "#F8F9FB",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  latestMeasurementContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  glucoseText: {
    color: "#3B83D1",
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    color: "#3B83D1",
    fontSize: 8,
    fontWeight: "500",
  },
  bottomGlucoseContainer: {
    height: 150,
    width: 350,
    padding: 16,
    backgroundColor: "#3B83D1",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  numberAndUnitsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  glucoseNumber: {
    color: "#3B83D1",
    fontSize: 40,
    fontWeight: "900",
  },
  glucoseUnitsText: {
    color: "#3B83D1",
    fontSize: 12,
    fontWeight: "400",
  },
  glucoseRangeText: {
    color: "#3DD17B",
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 100,
    backgroundColor: "#9CC0E8",
    margin: 16,
  },
  lastAndAverageContainer: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  textAndCirlceContainer: {
    alignItems: "center",
  },
  topCircleText: {
    color: "#9CC0E8",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 2,
  },
  lastScanContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#D13D3D",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  averageContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#3DD17B",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circleNumberText: {
    color: "#F8F9FB",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  circleUnitText: {
    color: "#F8F9FB",
    fontSize: 8,
    fontWeight: "400",
    textAlign: "center",
  },
});
