import FoodDiaryEntry, { FoodDiaryEntryDocument } from "./models/foodDiaryEntry";

const calculateTotalCalories = (foodDiaryEntries: FoodDiaryEntryDocument[]) => {
    if (foodDiaryEntries.length === 0) return 0

    const totalCalories = foodDiaryEntries.reduce((sum, entry) => sum + entry.nutritionalContent.calories, 0)

    return totalCalories
}


const getUserCurrentCalorieConsumption = async (userId: string, startOfDay: Date, endOfDay: Date) => {
    const query = {
        userId: userId,
        timestamp: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    }

    try {
        const foodDiaryEntries: FoodDiaryEntryDocument[] = await FoodDiaryEntry.find(query)

        const caloriesEaten = calculateTotalCalories(foodDiaryEntries)

        console.log(`Calories Eaten for user ${userId}: ${caloriesEaten}`);

        return caloriesEaten;
    } catch (error) {
        console.error(`Error finding consumption info for ${userId.toString()}`);

        throw error;
    }
}

// const getUserCalorieDisplayAssets = async (userId, date) => {
//     const userObjectId = new ObjectId = (userId);
//     const startOfDay = new Date(date).setHours(0, 0, 0, 0);
//     const endOfDay = new Date(date).setHours(23, 59, 99, 999);

//     const currentCalorieConsumption = getUserCurrentCalorieConsumption(userObjectId, startOfDay, endOfDay);
// }