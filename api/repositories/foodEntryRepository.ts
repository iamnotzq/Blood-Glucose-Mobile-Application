import _ from "lodash";
import FoodDiaryEntry, {
  FoodDiaryEntryDocument,
} from "./models/foodDiaryEntry";

interface ConsumptionHistoryEntry {
  date: Date;
  day: string;
  caloriesConsumed: number;
}

const calculateTotalCalories = (foodDiaryEntries: FoodDiaryEntryDocument[]) => {
  if (foodDiaryEntries.length === 0) return 0;

  const totalCalories = foodDiaryEntries.reduce(
    (sum, entry) => sum + entry.nutritionalContent.calories,
    0
  );

  return totalCalories;
};

const getUserCurrentCalorieConsumption = async (
  userId: string,
  startOfDay: Date,
  endOfDay: Date
): Promise<number> => {
  const query = {
    userId: userId,
    timestamp: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  };

  try {
    const foodDiaryEntries: FoodDiaryEntryDocument[] =
      await FoodDiaryEntry.find(query);

    const caloriesEaten = calculateTotalCalories(foodDiaryEntries);

    console.log(`Calories Eaten for user ${userId}: ${caloriesEaten}`);

    return caloriesEaten;
  } catch (error) {
    console.error(`Error finding consumption info for ${userId.toString()}`);

    throw error;
  }
};

const getUserConsumptionHistory = async (
  userId: string,
  currentTimestamp: Date
): Promise<ConsumptionHistoryEntry[]> => {
  const sevenDaysAgo = new Date(currentTimestamp);
  sevenDaysAgo.setDate(currentTimestamp.getDate() - 7);

  const query = {
    userId,
    timestamp: { $gte: sevenDaysAgo, $lte: currentTimestamp },
  };

  try {
    const entries: FoodDiaryEntryDocument[] = await FoodDiaryEntry.find(query);

    const groupedEntries = _.groupBy(
      entries,
      (entry) => entry.timestamp.toISOString().split("T")[0]
    );

    const sortedEntries = _.sortBy(
      _.map(groupedEntries, (group, date) => ({
        date: new Date(date),
        day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        caloriesConsumed: calculateTotalCalories(group),
      })),
      "date"
    );

    return sortedEntries;
  } catch (error) {
    console.error(`Error fetching calorie history for ${userId}: ${error}`);
    throw error;
  }
};

// const getUserCalorieDisplayAssets = async (userId, date) => {
//     const userObjectId = new ObjectId = (userId);
//     const startOfDay = new Date(date).setHours(0, 0, 0, 0);
//     const endOfDay = new Date(date).setHours(23, 59, 99, 999);

//     const currentCalorieConsumption = getUserCurrentCalorieConsumption(userObjectId, startOfDay, endOfDay);
// }

export { calculateTotalCalories, getUserCurrentCalorieConsumption };
