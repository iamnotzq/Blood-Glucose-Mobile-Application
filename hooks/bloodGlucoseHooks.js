import MedicationRecommendation from "../components/medicationRecommendation";

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
