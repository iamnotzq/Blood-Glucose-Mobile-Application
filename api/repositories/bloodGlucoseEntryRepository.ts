import BloodGlucoseEntry, {
  BloodGlucoseEntryDocument,
} from "./models/bloodGlucoseEntry";
import { BloodGlucoseSummary } from "../dtos/dashboardDTOs";

export const calculateAverageGlucoseLevel = (
  entries: BloodGlucoseEntryDocument[]
): number => {
  const length = entries.length;
  const sum = entries.reduce((sum, entry) => sum + entry.glucoseLevel, 0);
  const average = sum / length;

  return average;
};

export const getUserRecentGlucoseSummary = async (
  userId: string,
  currentTimestamp: Date
): Promise<BloodGlucoseSummary> => {
  try {
    const startOfDay = new Date(currentTimestamp);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(currentTimestamp);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const query = {
      userId: userId,
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    console.log(query);

    const entries: BloodGlucoseEntryDocument[] = await BloodGlucoseEntry.find(
      query
    );

    console.log(entries);

    const entriesLength = entries.length;

    if (entriesLength === 0) {
      return {
        currentGlucoseLevel: 0,
        previousGlucoseLevel: 0,
        averageGlucoseLevel: 0,
      };
    }

    const currentGlucoseLevel = entriesLength > 0 ? entries[0].glucoseLevel : 0;
    const previousGlucoseLevel =
      entriesLength > 1 ? entries[1].glucoseLevel : 0;
    const averageGlucoseLevel =
      entriesLength > 1
        ? calculateAverageGlucoseLevel(entries)
        : currentGlucoseLevel;

    const summary: BloodGlucoseSummary = {
      currentGlucoseLevel: currentGlucoseLevel,
      previousGlucoseLevel: previousGlucoseLevel,
      averageGlucoseLevel: averageGlucoseLevel,
    };

    return summary;
  } catch (error: any) {
    throw error;
  }
};

// const getUserBloodGlucoseHistory = async (
//   userId: string,
//   currentTimestamp: Date
// ): Promise<any> => {

//     const fiveDaysAgoTimestamp = new Date(currentTimestamp);
// };
