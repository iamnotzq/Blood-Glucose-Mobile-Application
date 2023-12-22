import BloodGlucoseEntry, {
  BloodGlucoseEntryDocument,
} from "./models/bloodGlucoseEntry";
import {
  BloodGlucoseSummary,
  DailyBloodGlucoseInformation,
} from "../dtos/dashboardDTOs";

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

    const entriesLength = entries.length;

    if (entriesLength === 0) {
      return {
        currentGlucoseLevel: 0,
        previousGlucoseLevel: 0,
        averageGlucoseLevel: 0,
      };
    }

    entries.sort((a, b) => (b.timestamp as any) - (a.timestamp as any));

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

export const getUserBloodGlucoseHistory = async (
  userId: string,
  currentTimestamp: Date
): Promise<DailyBloodGlucoseInformation[]> => {
  const fiveDaysAgoTimestamp = new Date(currentTimestamp);
  fiveDaysAgoTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 5);
  fiveDaysAgoTimestamp.setUTCHours(0, 0, 0, 0);

  const query = {
    userId: userId,
    timestamp: {
      $gte: fiveDaysAgoTimestamp,
      $lte: currentTimestamp,
    },
  };

  try {
    const ungroupedEntries: BloodGlucoseEntryDocument[] =
      await BloodGlucoseEntry.find(query);

    if (ungroupedEntries.length === 0) {
      const currentDateString = currentTimestamp.toISOString().split("T")[0];
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      const currentDayOfWeek = currentTimestamp.toLocaleDateString(
        "en-US",
        options
      );
      return [
        {
          dateString: currentDateString,
          dayOfWeek: currentDayOfWeek,
          averageGlucoseLevel: 0,
        },
      ];
    }

    const dateGroupedEntries: Map<string, BloodGlucoseEntryDocument[]> =
      new Map();
    ungroupedEntries.map((entry) => {
      const entryTimestamp: Date = entry.timestamp;
      const dateString: string = entryTimestamp.toISOString().split("T")[0];

      const existingEntries = dateGroupedEntries.get(dateString) || [];
      dateGroupedEntries.set(dateString, [...existingEntries, entry]);
    });

    const dateGroupedEntriesArray = Array.from(dateGroupedEntries.entries());

    const bloodGlucoseHistory: DailyBloodGlucoseInformation[] =
      dateGroupedEntriesArray.map((group) => {
        const bloodGlucoseEntries: BloodGlucoseEntryDocument[] = group[1];
        const averageGlucoseLevel =
          calculateAverageGlucoseLevel(bloodGlucoseEntries);
        const dateString = group[0];
        const groupTimestamp = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { weekday: "long" };
        const dayOfWeek = groupTimestamp.toLocaleDateString("en-US", options);

        const glucoseInformation: DailyBloodGlucoseInformation = {
          dateString: dateString,
          dayOfWeek: dayOfWeek,
          averageGlucoseLevel: averageGlucoseLevel,
        };

        return glucoseInformation;
      });

    return bloodGlucoseHistory;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
