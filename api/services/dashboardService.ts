import User, { UserDocument } from "../repositories/models/user";
import { getUserCalorieDisplayInformation } from "../repositories/foodEntryRepository";
import {
  getUserRecentGlucoseSummary,
  getUserBloodGlucoseHistory,
} from "../repositories/bloodGlucoseEntryRepository";
import {
  CalorieDisplayDTO,
  CalorieDisplayAssets,
  BloodGlucoseDisplayAssets,
  BloodGlucoseSummary,
  DailyBloodGlucoseInformation,
  DashboardDisplayAssets,
} from "../dtos/dashboardDTOs";

export const getUserCalorieGoal = async (userId: string): Promise<number> => {
  try {
    const user: UserDocument | null = await User.findById(userId);

    if (user) {
      const calorieGoal = user.caloricGoalKcal;

      if (calorieGoal) {
        return calorieGoal;
      } else {
        return 0;
      }
    } else {
      throw new Error(`User not found for: ${userId}`);
    }
  } catch (error: any) {
    console.error(`Error in retrieving caloric goal for user: ${userId}`);
    throw error;
  }
};

export const getUserCalorieDisplayAssets = async (
  userId: string
): Promise<CalorieDisplayAssets> => {
  try {
    const currentTimestamp = new Date();
    const calorieDisplayInfo: CalorieDisplayDTO =
      await getUserCalorieDisplayInformation(userId, currentTimestamp);

    const calGoal = await getUserCalorieGoal(userId);
    const calEaten = calorieDisplayInfo.currentCalorieConsumption;
    const calLeft = calGoal - calEaten;
    const dailyProgress = calEaten / calGoal;
    const consumptionHistory = calorieDisplayInfo.consumptionHistory;

    const assets: CalorieDisplayAssets = {
      calGoal: calGoal,
      calEaten: calEaten,
      calLeft: calLeft,
      dailyProgress: dailyProgress,
      consumptionHistory: consumptionHistory,
    };

    return assets;
  } catch (error: any) {
    console.error(`Unable to get calorie display assets for user: ${userId}`);
    throw error;
  }
};

export const getUserBloodGlucoseDisplayAssets = async (
  userId: string
): Promise<BloodGlucoseDisplayAssets> => {
  try {
    const currentTimestamp = new Date();
    const recentSummary: BloodGlucoseSummary =
      await getUserRecentGlucoseSummary(userId, currentTimestamp);
    const measurementHistory: DailyBloodGlucoseInformation[] =
      await getUserBloodGlucoseHistory(userId, currentTimestamp);

    const latestMeasurement = recentSummary.currentGlucoseLevel;
    const previousMeasurement = recentSummary.previousGlucoseLevel;
    const averageMeasurement = recentSummary.averageGlucoseLevel;

    const assets: BloodGlucoseDisplayAssets = {
      latestMeasurement: latestMeasurement,
      previousMeasurement: previousMeasurement,
      averageMeasurement: averageMeasurement,
      measurementHistory: measurementHistory,
    };

    return assets;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const getDashboardAssets = async (
  userId: string
): Promise<DashboardDisplayAssets> => {
  try {
    const calorieDisplayAssets = await getUserCalorieDisplayAssets(userId);
    const bloodGlucoseDisplayAssets = await getUserBloodGlucoseDisplayAssets(
      userId
    );

    const dashboardDisplayAssets: DashboardDisplayAssets = {
      calorieDisplayAssets: calorieDisplayAssets,
      bloodGlucoseDisplayAssets: bloodGlucoseDisplayAssets,
    };

    return dashboardDisplayAssets;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Unable to retrieve dashboard assets for user: ${userId}`);
  }
};
