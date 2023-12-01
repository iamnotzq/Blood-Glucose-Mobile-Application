const FoodEntry = require("../models/foodEntry");
const { ObjectId } = require("mongoose")

// const calculateTotalCalories = (foodEntries) => {
//     if(foodEntries.length === 0) return 0

//     const totalCalories = foodEntries.reduce((sum, entry) sum + entry.ni, 0)
// }


const getUserCurrentCalorieConsumption = async (userObjectId, startOfDay, endOfDay) => {
    const s = new ObjectId(userObjectId).to
    const query = {
        userId: userObjectId,
        timestamp: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    }

    try {
        const foodEntries = await FoodEntry.find(query)

        const caloriesEaten = calculateTotalCalories(foodEntries)

        console.log(`Calories Eaten for user ${userObjectId.toString()}: ${caloriesEaten}`);

        return caloriesEaten;
    } catch (error) {
        console.error(`Error finding consumption info for ${userObjectId.toString()}`);

        throw error;
    }
}

// const getUserCalorieDisplayAssets = async (userIdString, date) => {
//     const userObjectId = new ObjectId = (userIdString);
//     const startOfDay = new Date(date).setHours(0, 0, 0, 0);
//     const endOfDay = new Date(date).setHours(23, 59, 99, 999);

//     const currentCalorieConsumption = getUserCurrentCalorieConsumption(userObjectId, startOfDay, endOfDay);
// }