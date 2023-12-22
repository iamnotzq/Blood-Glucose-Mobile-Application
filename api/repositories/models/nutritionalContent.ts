import mongoose, { Document, Schema } from "mongoose";

export interface NutritionalContentDocument extends Document {
  foodName: string;
  calories: number;
  carbohydrates: number;
  sodium: number;
  fat: number;
  fiber: number;
}

const NutritionalContentSchema = new Schema<NutritionalContentDocument>({
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  sodium: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, required: true },
});

const NutritionalContent = mongoose.model<NutritionalContentDocument>(
  "NutritionalContent",
  NutritionalContentSchema
);

export default NutritionalContent;
