import FoodDiaryEntry, {
  FoodDiaryEntryDocument,
} from "./models/foodDiaryEntry";
import {
  DailyConsumptionInformation,
  CalorieDisplayDTO,
} from "../dtos/dashboardDTOs";

const calculateTotalCalories = (
  ungroupedFoodEntries: FoodDiaryEntryDocument[]
) => {
  if (ungroupedFoodEntries.length === 0) return 0;

  const totalCalories = ungroupedFoodEntries.reduce(
    (sum, entry) => sum + entry.nutritionalContent.calories,
    0
  );

  return totalCalories;
};

const getUserCurrentCalorieConsumption = async (
  userId: string,
  currentTimestamp: Date
): Promise<number> => {
  const startOfDay = new Date(currentTimestamp);
  const endOfDay = new Date(currentTimestamp);
  startOfDay.setUTCHours(0, 0, 0, 0);
  endOfDay.setUTCHours(23, 59, 59, 999);
  const query = {
    userId: userId,
    timestamp: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  };

  try {
    const ungroupedFoodEntries: FoodDiaryEntryDocument[] =
      await FoodDiaryEntry.find(query);

    const caloriesEaten = calculateTotalCalories(ungroupedFoodEntries);

    console.log(`Calories Eaten for user ${userId}: ${caloriesEaten}`);

    return caloriesEaten;
  } catch (error: any) {
    console.error(`Error finding consumption info for ${userId.toString()}`);

    throw error;
  }
};

const getUserConsumptionHistory = async (
  userId: string,
  currentTimestamp: Date
): Promise<DailyConsumptionInformation[]> => {
  const sevenDaysAgoTimestamp = new Date(currentTimestamp);
  sevenDaysAgoTimestamp.setUTCDate(currentTimestamp.getUTCDate() - 7);
  sevenDaysAgoTimestamp.setUTCHours(0, 0, 0, 0);

  const query = {
    userId: userId,
    timestamp: {
      $gte: sevenDaysAgoTimestamp,
      $lte: currentTimestamp,
    },
  };

  try {
    const ungroupedFoodEntries: FoodDiaryEntryDocument[] =
      await FoodDiaryEntry.find(query);

    const dateGroupedEntries: Map<string, FoodDiaryEntryDocument[]> = new Map();

    ungroupedFoodEntries.map((entry) => {
      const entryTimestamp: Date = entry.timestamp;
      const dateString: string = entryTimestamp.toISOString().split("T")[0];

      const existingEntries = dateGroupedEntries.get(dateString) || [];
      dateGroupedEntries.set(dateString, [...existingEntries, entry]);
    });

    const dateGroupedEntriesArray = Array.from(dateGroupedEntries.entries());
    const consumptionHistory = dateGroupedEntriesArray.map((group) => {
      const foodEntries = group[1];
      const totalCalories = calculateTotalCalories(foodEntries);

      const dateString = group[0];
      const groupTimestamp = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      const dayOfWeek = groupTimestamp.toLocaleDateString("en-US", options);

      const consumptionInformation: DailyConsumptionInformation = {
        dateString: dateString,
        dayOfWeek: dayOfWeek,
        totalCaloriesConsumed: totalCalories,
      };

      return consumptionInformation;
    });

    return consumptionHistory;
  } catch (error: any) {
    console.error(`Error finding consumption history for user: ${userId}`);
    throw error;
  }
};

const getUserCalorieDisplayInformation = async (
  userId: string,
  currentTimestamp: Date
): Promise<CalorieDisplayDTO> => {
  try {
    const currentCalorieConsumption = await getUserCurrentCalorieConsumption(
      userId,
      currentTimestamp
    );

    const consumptionHistory = await getUserConsumptionHistory(
      userId,
      currentTimestamp
    );

    const dto: CalorieDisplayDTO = {
      currentCalorieConsumption: currentCalorieConsumption,
      consumptionHistory: consumptionHistory,
    };

    return dto;
  } catch (error: any) {
    console.error(
      `Error in receiving calorie display assets for user: ${userId}`
    );
    throw error;
  }
};

export {
  calculateTotalCalories,
  getUserCurrentCalorieConsumption,
  getUserConsumptionHistory,
  getUserCalorieDisplayInformation,
};
