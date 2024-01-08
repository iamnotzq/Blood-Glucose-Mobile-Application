import BloodGlucoseEntry, {
  BloodGlucoseEntryDocument,
} from "../repositories/models/bloodGlucoseEntry";

import { AddBloodGlucoseEntryRequestBody } from "../routes/models/requests/requestBodies";
import {
  BloodGlucoseChartData,
  GetBloodGlucoseChartDataResponseBody,
} from "../routes/models/responses/responseBodies";

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

const fetchBloodGlucoseDataByTimestamp = async (
  id: string,
  startingTimestamp: Date,
  endingTimestamp: Date,
  period: "daily" | "weekly" | "monthly"
): Promise<BloodGlucoseChartData[]> => {
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

    const entriesByDateMap = new Map<string, number[]>();

    entries.forEach((entry) => {
      let entryDate = "";

      if (period === "daily") {
        entryDate = new Date(entry.timestamp).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });
      } else if (period === "weekly") {
        entryDate = new Date(entry.timestamp).toLocaleDateString(undefined, {
          weekday: "short",
        });
      } else if (period === "monthly") {
        entryDate = new Date(entry.timestamp).toLocaleDateString(undefined, {
          month: "short",
        });
      }

      if (!entriesByDateMap.has(entryDate)) {
        entriesByDateMap.set(entryDate, [entry.glucoseLevel]);
      }

      entriesByDateMap.get(entryDate)?.push(entry.glucoseLevel);
    });

    const chartDataArray: BloodGlucoseChartData[] = Array.from(
      entriesByDateMap
    ).map(([date, glucoseLevels]) => {
      const averageGlucose =
        glucoseLevels.reduce((sum, level) => sum + level, 0) /
        glucoseLevels.length;
      const data: BloodGlucoseChartData = {
        dayString: date,
        glucoseLevel: averageGlucose,
      };
      return data;
    });

    const allDates = getDatesInRange(startingTimestamp, endingTimestamp);

    if (period === "daily") {
      allDates.forEach((date, index) => {
        const timeString = new Date(date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });
        if (index < chartDataArray.length) {
          chartDataArray[index].dayString = timeString;
        } else {
          chartDataArray.push({ dayString: timeString, glucoseLevel: 0 });
        }
      });
    } else if (period === "weekly") {
      allDates.forEach((date, index) => {
        const dateString = new Date(date).toLocaleDateString(undefined, {
          weekday: "short",
        });
        if (index < chartDataArray.length) {
          chartDataArray[index].dayString = dateString;
        } else {
          chartDataArray.push({ dayString: dateString, glucoseLevel: 0 });
        }
      });
    } else if (period === "monthly") {
      allDates.forEach((date, index) => {
        const monthString = new Date(date).toLocaleDateString(undefined, {
          month: "short",
        });
        if (index < chartDataArray.length) {
          chartDataArray[index].dayString = monthString;
        } else {
          chartDataArray.push({ dayString: monthString, glucoseLevel: 0 });
        }
      });
    }

    chartDataArray.sort(
      (a, b) =>
        new Date(a.dayString).getTime() - new Date(b.dayString).getTime()
    );

    return chartDataArray;
  } catch (error: any) {
    throw new Error(`Error in fetchBloodGlucoseDataByTimestamp ${error}`);
  }
};

export const getBloodGlucoseChartData = async (
  id: string
): Promise<GetBloodGlucoseChartDataResponseBody> => {
  const currentTimestamp = new Date();

  // Fetch data for the entire current day up to the current time
  try {
    const dailyStartingTimestamp = new Date(currentTimestamp);
    dailyStartingTimestamp.setHours(0, 0, 0, 0);
    const dailyData = await fetchBloodGlucoseDataByTimestamp(
      id,
      currentTimestamp,
      dailyStartingTimestamp, // Start of the current day
      "daily"
    );

    // Fetch data for the last 5 days (including the current day)
    const weeklyStartingTimestamp = new Date(currentTimestamp);
    weeklyStartingTimestamp.setDate(weeklyStartingTimestamp.getDate() - 5);
    const weeklyData = await fetchBloodGlucoseDataByTimestamp(
      id,
      currentTimestamp,
      weeklyStartingTimestamp,
      "weekly"
    );

    // Fetch data for the last 5 months (including the current month)
    const monthlyStartingTimestamp = new Date(currentTimestamp);
    monthlyStartingTimestamp.setDate(monthlyStartingTimestamp.getMonth() - 5);
    const monthlyData = await fetchBloodGlucoseDataByTimestamp(
      id,
      currentTimestamp,
      monthlyStartingTimestamp,
      "monthly"
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
