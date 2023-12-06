import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  age: number;
  gender: string;
  weightKg: number;
  heightCm: number;
  diabetesType: string;
  medicationList: string[];
  caloricGoalKcal?: number;
  hyperMgDl: number;
  hypoMgDl: number;
  targetLowerMgDl: number;
  targetUpperMgDl: number;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  weightKg: {
    type: Number,
    required: true,
  },
  heightCm: {
    type: Number,
    required: true,
  },
  diabetesType: {
    type: String,
    required: true,
  },
  medicationList: {
    type: [String],
    required: true,
  },
  caloricGoalKcal: {
    type: Number,
  },
  hyperMgDl: {
    type: Number,
    required: true,
  },
  hypoMgDl: {
    type: Number,
    required: true,
  },
  targetLowerMgDl: {
    type: Number,
    required: true,
  },
  targetUpperMgDl: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export { User, UserDocument };
