import { User, UserDocument } from "../repositories/models/user";
import { getUserCalorieDisplayInformation } from "../repositories/foodEntryRepository";
import { CalorieDisplayDTO, CalorieDisplayAssets } from "../dtos/dashboardDTOs";

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
