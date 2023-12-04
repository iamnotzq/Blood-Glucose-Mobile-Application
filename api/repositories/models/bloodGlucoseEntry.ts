import mongoose, { Document, Schema } from "mongoose";

export interface BloodGlucoseEntryDocument extends Document {
  userId: string;
  timestamp: Date;
  glucoseLevel: number;
}

const BloodGlucoseEntrySchema = new Schema<BloodGlucoseEntryDocument>({
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  glucoseLevel: { type: Number, required: true },
});

const BloodGlucoseEntry = mongoose.model<BloodGlucoseEntryDocument>(
  "BloodGlucoseEntry",
  BloodGlucoseEntrySchema
);

export default BloodGlucoseEntry;
