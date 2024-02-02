import { StyleSheet } from "react-native";

export const bloodGlucoseStyles = StyleSheet.create({
  bloodGlucoseRecordsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  promptContainer: {
    height: "30%",
    width: "80%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  promptHeader: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 16,
  },
  promptText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  glucoseRecordComponent: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  glucoseLevelText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.7,
  },
  glucoseNumberText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
  },
  unitsText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    opacity: 0.7
  },
  timeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
