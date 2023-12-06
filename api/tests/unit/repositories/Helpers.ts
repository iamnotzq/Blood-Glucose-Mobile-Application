import { BloodGlucoseEntryDocument } from "../../../repositories/models/bloodGlucoseEntry";

export const calculateAverageHelper = (
  entries: BloodGlucoseEntryDocument[]
): number => {
  const total = entries.reduce((sum, entry) => sum + entry.glucoseLevel, 0);
  const numOfEntries = entries.length;

  const average = total / numOfEntries;

  return average;
};
