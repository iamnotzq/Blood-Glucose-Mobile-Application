import { View, Text } from "react-native";
import { bloodGlucoseStyles } from "../styles/bloodGlucoseStyles";

const GlucoseRecord = ({ id, glucoseLevel, time }) => {
  return (
    <View style={bloodGlucoseStyles.glucoseRecordComponent}>
      <View>
        <Text style={bloodGlucoseStyles.glucoseLevelText}>Glucose Level</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Text style={bloodGlucoseStyles.glucoseNumberText}>
            {glucoseLevel}{" "}
          </Text>
          <Text style={bloodGlucoseStyles.unitsText}>mg/dl</Text>
        </View>
      </View>

      <Text style={bloodGlucoseStyles.timeText}>{time}</Text>
    </View>
  );
};

export default GlucoseRecord;
