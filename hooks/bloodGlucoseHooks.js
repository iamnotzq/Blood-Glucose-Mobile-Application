import { View, Text, ScrollView } from "react-native";
import MedicationRecommendation from "../components/medicationRecommendation";
import { bloodGlucoseStyles } from "../styles/bloodGlucoseStyles";
import GlucoseRecord from "../components/glucoseRecord";

const calculateUnits = (numBloodGlucoseLevel, numUpperLevel) => {
  if (numBloodGlucoseLevel <= numUpperLevel) return 0;

  const correctionFactor = 50;
  const difference = numBloodGlucoseLevel - numUpperLevel;
  const units = Math.ceil((difference / correctionFactor) * 10) / 10;

  return units;
};

export const renderMedicationRecommendation = (
  timeString,
  bloodGlucoseLevel,
  upperLevel
) => {
  const numBloodGlucoseLevel = parseInt(bloodGlucoseLevel);
  const numUpperLevel = parseInt(upperLevel);
  const units = calculateUnits(numBloodGlucoseLevel, numUpperLevel);

  if (numBloodGlucoseLevel > numUpperLevel) {
    return (
      <MedicationRecommendation
        medicationName="Fast Acting Insulin"
        consumptionPeriod={timeString}
        units={units}
      />
    );
  }

  return;
};

export const renderBloodGlucoseRecords = (glucoseRecords) => {
  if (!glucoseRecords || glucoseRecords.length < 1)
    return (
      <View style={bloodGlucoseStyles.promptContainer}>
        <Text style={bloodGlucoseStyles.promptHeader}>Time to Act!</Text>
        <Text style={bloodGlucoseStyles.promptText}>
          No records today? Click 'New Records' to kickstart a healthier you!
        </Text>
      </View>
    );

  return (
    <ScrollView
      style={bloodGlucoseStyles.bloodGlucoseRecordsContainer}
      contentContainerStyle={{
        flexGrow: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {glucoseRecords.map((record) => {
        const id = record._id;
        const glucoseLevel = record.glucoseLevel;
        const time = record.timeString;

        return (
          <GlucoseRecord
            key={id}
            id={id}
            glucoseLevel={glucoseLevel}
            time={time}
          />
        );
      })}
    </ScrollView>
  );
};

export const displayCurrentDate = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};
