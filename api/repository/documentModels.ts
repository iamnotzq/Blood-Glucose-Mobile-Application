import { Document, ObjectId } from "mongoose";

interface NutritionalContentDocument {
    calories: number,
    carbohydrates: number,
    sodium: number,
    fat: number,
    fiber: number,
}

interface FoodEntryDocument extends Document {
    _id: ObjectId,
    userId: string,
    timestamp: Date,
    foodName: string,
    portionSize: number,
    mealType: string,
    mealDescription?: string,
    nutritionalContent: NutritionalContentDocument
}

export default FoodEntryDocument