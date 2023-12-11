import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI as string;

    await mongoose.connect(mongoURI);

    console.log("Db is connected");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
};
