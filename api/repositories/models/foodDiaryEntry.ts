import mongoose, { Document, Schema } from "mongoose";

export interface NutritionalContentDocument {
  calories: number;
  carbohydrates: number;
  sodium: number;
  fat: number;
  fiber: number;
}

const NutritionalContentSchema = new Schema<NutritionalContentDocument>({
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  sodium: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, required: true },
});

export interface FoodDiaryEntryDocument extends Document {
  userId: string;
  timestamp: Date;
  foodName: string;
  portionSize: number;
  mealType: string;
  mealDescription?: string;
  nutritionalContent: NutritionalContentDocument;
}

const foodDiaryEntrySchema = new Schema<FoodDiaryEntryDocument>({
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  foodName: { type: String, required: true },
  portionSize: { type: Number, required: true },
  mealType: { type: String, required: true },
  mealDescription: { type: String, required: false },
  nutritionalContent: { type: NutritionalContentSchema, required: true },
});

const FoodDiaryEntry = mongoose.model<FoodDiaryEntryDocument>(
  "FoodDiaryEntry",
  foodDiaryEntrySchema
);

export default FoodDiaryEntry;
