import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GlucoseContainer = ({ data }) => {
  const lower = 110;
  const upper = 130;

  const latestMeasurement = data.latestMeasurement;
  const previousMeasurement = data.previousMeasurement;
  const averageMeasurement = data.averageMeasurement;

  const rangeText =
    latestMeasurement >= lower && latestMeasurement <= upper
      ? "Acceptable"
      : latestMeasurement < lower
      ? "Hypoglycemic"
      : "Hyperglycemic";

  const rangeColour =
    latestMeasurement >= lower && latestMeasurement <= upper
      ? "#3DD17B"
      : "#D13D3D";

  const lastScanColour =
    previousMeasurement >= lower && previousMeasurement <= upper
      ? "#3DD17B"
      : "#D13D3D";

  const averageColour =
    averageMeasurement >= lower && latestMeasurement <= upper
      ? "#3DD17B"
      : "#D13D3D";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.glucoseText}>Glucose</Text>
        <View></View>
      </View>

      <View style={styles.latestMeasurementContainer}>
        <Text style={styles.subText}>Latest Measurement</Text>
        <View style={styles.latestMeasurementRow}>
          <Text style={styles.glucoseNumber}>{latestMeasurement}</Text>
          <Text style={styles.glucoseUnitsText}>mg/dL</Text>
        </View>

        <Text style={[styles.glucoseRangeText, { color: rangeColour }]}>
          {rangeText}
        </Text>
      </View>

      {/* <View style={styles.divider}></View> */}

      <View style={styles.lastAndAverageContainer}>
        <View style={styles.textAndCircleContainer}>
          <Text style={styles.topCircleText}>Last Scan</Text>
          <View
            style={[
              styles.lastScanContainer,
              { backgroundColor: lastScanColour },
            ]}
          >
            <Text style={styles.circleNumberText}>{previousMeasurement}</Text>
            <Text style={styles.circleUnitText}>mg/dL</Text>
          </View>
        </View>

        <View style={styles.textAndCircleContainer}>
          <Text style={styles.topCircleText}>Average</Text>
          <View
            style={[
              styles.averageContainer,
              { backgroundColor: averageColour },
            ]}
          >
            <Text style={styles.circleNumberText}>{averageMeasurement}</Text>
            <Text style={styles.circleUnitText}>mg/dL</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GlucoseContainer;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    height: 360,
    width: 350,
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  latestMeasurementContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3B83D1",
    width: "100%",
    borderWidth: 3,
    borderRadius: 16,
    padding: 16,
  },
  latestMeasurementRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  glucoseText: {
    color: "#3B83D1",
    fontSize: 32,
    fontWeight: "700",
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#3B83D1",
    opacity: 0.5,
  },
  subText: {
    color: "#3B83D1",
    fontSize: 22,
    fontWeight: "500",
    opacity: 0.6,
    width: "100%",
    textAlign: "left",
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
    fontSize: 22,
    fontWeight: "400",
  },
  glucoseRangeText: {
    width: "100%",
    color: "#3DD17B",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "left",
  },
  lastAndAverageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  textAndCircleContainer: {
    alignItems: "center",
  },
  topCircleText: {
    color: "#9CC0E8",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 2,
  },
  lastScanContainer: {
    height: 100,
    width: 100,
    backgroundColor: "#D13D3D",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  averageContainer: {
    height: 100,
    width: 100,
    backgroundColor: "#3DD17B",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  circleNumberText: {
    color: "#F8F9FB",
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
  },
  circleUnitText: {
    color: "#F8F9FB",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});
