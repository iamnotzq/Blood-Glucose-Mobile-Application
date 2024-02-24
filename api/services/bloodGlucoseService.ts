import BloodGlucoseEntry, {
  BloodGlucoseEntryDocument,
} from "../repositories/models/bloodGlucoseEntry";
import { AddBloodGlucoseEntryRequestBody } from "../routes/models/requests/requestBodies";
import {
  BloodGlucoseChartData,
  GetBloodGlucoseChartDataResponseBody,
  BloodGlucoseChartAssets,
  GetUserGlucoseLevelsResponseBody,
  GetTodayGlucoseRecordsResponseBody,
  BloodGlucoseRecord,
} from "../routes/models/responses/responseBodies";
import { getUserGlucoseRange } from "./userService";

export const addBloodGlucoseEntry = async (
  requestBody: AddBloodGlucoseEntryRequestBody
): Promise<string> => {
  const newEntry = new BloodGlucoseEntry(requestBody);

  try {
    await newEntry.save();
    return newEntry._id;
  } catch (error: any) {
    console.error(`Error in adding glucose entry`);
    throw new Error(error.message);
  }
};

const getDatesInRange = (start: Date, end: Date): Date[] => {
  const dates = [];
  let current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const fetchDailyBloodGlucoseData = async (
  id: string,
  glucoseRange: GetUserGlucoseLevelsResponseBody
): Promise<BloodGlucoseChartAssets> => {
  const query = {
    userId: id,
  };

  try {
    const entries: BloodGlucoseEntryDocument[] = await BloodGlucoseEntry.find(
      query
    )
      .sort({ timestamp: -1 }) // Sort in ascending order based on timestamp
      .limit(5); // Limit the results to the specified count

    const updatedChartDataArray: BloodGlucoseChartData[] = entries.map(
      (entry) => {
        const timeString = new Date(entry.timestamp).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
          }
        );

        return {
          dayString: timeString,
          glucoseLevel: entry.glucoseLevel,
        };
      }
    );

    updatedChartDataArray.sort((a, b) => {
      const timeA = new Date(`2000-01-01 ${a.dayString}`);
      const timeB = new Date(`2000-01-01 ${b.dayString}`);
      return timeA.getTime() - timeB.getTime();
    });

    const filteredChartDataArray = updatedChartDataArray.filter(
      (data) => data.glucoseLevel !== 0
    );

    const average =
      filteredChartDataArray.reduce(
        (sum, entry) => sum + entry.glucoseLevel,
        0
      ) / filteredChartDataArray.length;

    const index =
      average >= glucoseRange.lowerLevel && average <= glucoseRange.upperLevel
        ? 1
        : average > glucoseRange.upperLevel
        ? 3
        : 2;

    return {
      array: updatedChartDataArray,
      index: index,
    };
  } catch (error: any) {
    throw new Error(`Error in fetchDailyBloodGlucoseData ${error}`);
  }
};

const fetchWeeklyBloodGlucoseData = async (
  id: string,
  startingTimestamp: Date,
  endingTimestamp: Date,
  glucoseRange: GetUserGlucoseLevelsResponseBody
): Promise<BloodGlucoseChartAssets> => {
  const query = {
    userId: id,
    timestamp: {
      $gte: startingTimestamp,
      $lte: endingTimestamp,
    },
  };

  try {
    const entries: BloodGlucoseEntryDocument[] = await BloodGlucoseEntry.find(
      query
    );

    const allDates = getDatesInRange(startingTimestamp, endingTimestamp);

    const updatedChartDataArray = allDates.map((date) => {
      const dateString = new Date(date).toLocaleDateString(undefined, {
        weekday: "short",
      });

      const correspondingEntries = entries.filter((entry) => {
        const entryDateString = new Date(entry.timestamp).toLocaleDateString(
          undefined,
          {
            weekday: "short",
          }
        );
        return dateString === entryDateString;
      });

      const glucoseLevel =
        correspondingEntries.length > 0
          ? correspondingEntries.reduce(
              (sum, entry) => sum + entry.glucoseLevel,
              0
            ) / correspondingEntries.length
          : 0;

      return {
        dayString: dateString,
        glucoseLevel,
      };
    });

    updatedChartDataArray.sort(
      (a, b) =>
        new Date(a.dayString).getTime() - new Date(b.dayString).getTime()
    );

    const filteredChartDataArray = updatedChartDataArray.filter(
      (data) => data.glucoseLevel !== 0
    );

    const average =
      filteredChartDataArray.reduce(
        (sum, entry) => sum + entry.glucoseLevel,
        0
      ) / filteredChartDataArray.length;

    const index =
      average >= glucoseRange.lowerLevel && average <= glucoseRange.upperLevel
        ? 1
        : average > glucoseRange.upperLevel
        ? 3
        : 2;

    return {
      array: updatedChartDataArray,
      index: index,
    };
  } catch (error: any) {
    throw new Error(`Error in fetchWeeklyBloodGlucoseData ${error}`);
  }
};

const fetchMonthlyBloodGlucoseData = async (
  id: string,
  startingTimestamp: Date,
  endingTimestamp: Date,
  glucoseRange: GetUserGlucoseLevelsResponseBody
): Promise<BloodGlucoseChartAssets> => {
  const query = {
    userId: id,
    timestamp: {
      $gte: startingTimestamp,
      $lte: endingTimestamp,
    },
  };

  try {
    const entries: BloodGlucoseEntryDocument[] = await BloodGlucoseEntry.find(
      query
    );

    const monthsArray = [];
    for (let i = 0; i < 5; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      monthsArray.push({
        dateString: month.toLocaleDateString(undefined, {
          month: "short",
        }),
        glucoseLevels: [],
      });
    }

    entries.forEach((entry) => {
      const entryMonthString = new Date(entry.timestamp).toLocaleDateString(
        undefined,
        {
          month: "short",
        }
      );

      const correspondingMonth = monthsArray.find(
        (month) => month.dateString === entryMonthString
      );

      if (correspondingMonth) {
        correspondingMonth.glucoseLevels.push(entry.glucoseLevel);
      }
    });

    const updatedChartDataArray: BloodGlucoseChartData[] = monthsArray.map(
      (month) => {
        const averageGlucose =
          month.glucoseLevels.reduce((sum, level) => sum + level, 0) /
            month.glucoseLevels.length || 0;

        return {
          dayString: month.dateString,
          glucoseLevel: averageGlucose,
        };
      }
    );

    updatedChartDataArray.sort(
      (a, b) =>
        new Date(a.dayString).getTime() - new Date(b.dayString).getTime()
    );

    updatedChartDataArray.reverse();

    const filteredChartDataArray = updatedChartDataArray.filter(
      (data) => data.glucoseLevel !== 0
    );

    const average =
      filteredChartDataArray.reduce(
        (sum, entry) => sum + entry.glucoseLevel,
        0
      ) / filteredChartDataArray.length;

    const index =
      average >= glucoseRange.lowerLevel && average <= glucoseRange.upperLevel
        ? 1
        : average > glucoseRange.upperLevel
        ? 3
        : 2;

    return {
      array: updatedChartDataArray,
      index: index,
    };
  } catch (error: any) {
    throw new Error(`Error in fetchMonthlyBloodGlucoseData ${error}`);
  }
};

export const getBloodGlucoseChartData = async (
  id: string
): Promise<GetBloodGlucoseChartDataResponseBody> => {
  const currentTimestamp = new Date();
  const glucoseRange = await getUserGlucoseRange(id);

  try {
    const dailyStartingTimestamp = new Date(currentTimestamp);
    dailyStartingTimestamp.setHours(0, 0, 0, 0);
    dailyStartingTimestamp.setDate(dailyStartingTimestamp.getDate() - 4);
    const dailyData = await fetchDailyBloodGlucoseData(id, glucoseRange);

    const weeklyStartingTimestamp = new Date(currentTimestamp);
    weeklyStartingTimestamp.setDate(weeklyStartingTimestamp.getDate() - 4);
    const weeklyData = await fetchWeeklyBloodGlucoseData(
      id,
      weeklyStartingTimestamp,
      currentTimestamp,
      glucoseRange
    );

    const monthlyStartingTimestamp = new Date(currentTimestamp);
    monthlyStartingTimestamp.setDate(monthlyStartingTimestamp.getMonth() - 4);
    const monthlyData = await fetchMonthlyBloodGlucoseData(
      id,
      monthlyStartingTimestamp,
      currentTimestamp,
      glucoseRange
    );

    return {
      daily: dailyData,
      weekly: weeklyData,
      monthly: monthlyData,
    };
  } catch (error: any) {
    throw new Error(`Error in getBloodGlucoseChartData ${error}`);
  }
};

const convertTimestampToTimeString = (timestamp: Date) => {
  const unformattedHours = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  const period = unformattedHours >= 12 ? "PM" : "AM";
  const formattedHours = unformattedHours % 12 || 12;

  const timeString = `${formattedHours}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;

  return timeString;
};

export const getTodayGlucoseRecords = async (
  id: string
): Promise<GetTodayGlucoseRecordsResponseBody> => {
  const currentTimestamp = new Date();
  const startingTimestamp = new Date();
  startingTimestamp.setHours(0, 0, 0, 0);

  const query = {
    userId: id,
    timestamp: {
      $gte: startingTimestamp,
      $lte: currentTimestamp,
    },
  };

  try {
    const entries: BloodGlucoseEntryDocument[] = await BloodGlucoseEntry.find(
      query
    );

    if (entries.length < 1) return { records: [] };

    entries.sort((a, b) => (b.timestamp as any) - (a.timestamp as any));

    const records: BloodGlucoseRecord[] = entries.map((entry) => ({
      id: entry._id,
      glucoseLevel: entry.glucoseLevel,
      timeString: convertTimestampToTimeString(entry.timestamp),
    }));

    return {
      records: records,
    };
  } catch (error: any) {
    throw new Error(`Error in getTodayGlucoseRecords ${error}`);
  }
};

export const getRecentRecord = async (id: string): Promise<number> => {
  try {
    const response: GetTodayGlucoseRecordsResponseBody =
      await getTodayGlucoseRecords(id);
    const records = response.records;

    if (records.length < 1 || records === null) {
      return 0;
    }

    const recentRecord = records[0];
    return recentRecord.glucoseLevel;
  } catch (error: any) {
    throw new Error(`Error in getRecentRecord ${error}`);
  }
};
