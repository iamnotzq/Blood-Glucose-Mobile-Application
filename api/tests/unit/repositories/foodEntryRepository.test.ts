import { config } from "dotenv";
config();
import {
  jest,
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from "@jest/globals";
import mongoose, { Document } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as foodDiaryRepo from "../../../repositories/foodEntryRepository";
import FoodDiaryEntry, {
  FoodDiaryEntryDocument,
} from "../../../repositories/models/foodDiaryEntry";
import { FakeFoodEntries, FakeMixedFoodEntries } from "./Fakes";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const uri = process.env.MONGO_URI as string;
  await mongoose.connect(uri);
}, 20000);

beforeEach(async () => {
  await FoodDiaryEntry.insertMany(FakeMixedFoodEntries);
});

afterEach(async () => {
  await FoodDiaryEntry.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("calculateTotalCalories", () => {
  it("Should return the total number of calories when foodEntries is populated", () => {
    const expected = FakeFoodEntries.reduce(
      (sum, entry) => sum + entry.nutritionalContent.calories,
      0
    );

    const result = foodDiaryRepo.calculateTotalCalories(FakeFoodEntries);
    console.log(`Total Calories: ${result}`);

    expect(result).toBe(expected);
  });

  it("Should return 0 if foodEntries is empty", () => {
    const emptyFoodEntries: FoodDiaryEntryDocument[] = [];

    const expected = 0;
    const result = foodDiaryRepo.calculateTotalCalories(emptyFoodEntries);

    expect(result).toBe(expected);
  });
});

describe("getUserCurrentCalorieConsumption", () => {
  it("Should return the correct number of calories for documents that have the same userId and date", async () => {
    const fakeUserId = "656aed89594fc49ef5cac032";
    const fakeStartDate = new Date(Date.UTC(2023, 11, 2, 0, 0, 0, 0));
    const fakeEndDate = new Date(Date.UTC(2023, 11, 2, 23, 59, 59, 999));

    const correctFoodEntries = FakeMixedFoodEntries.filter(
      (entry) =>
        entry.userId === fakeUserId &&
        entry.timestamp >= fakeStartDate &&
        entry.timestamp <= fakeEndDate
    );

    const expected = correctFoodEntries.reduce(
      (sum, entry) => sum + entry.nutritionalContent.calories,
      0
    );

    const result = await foodDiaryRepo.getUserCurrentCalorieConsumption(
      fakeUserId,
      fakeStartDate,
      fakeEndDate
    );

    expect(result).toBe(expected);
  });

  it("Should return 0 for a userId that does not exist", async () => {
    const fakeUserId = "656b4365e37d5230a938295c";
    const fakeStartDate = new Date(Date.UTC(2023, 11, 2, 0, 0, 0, 0));
    const fakeEndDate = new Date(Date.UTC(2023, 11, 2, 23, 59, 59, 999));

    const result = await foodDiaryRepo.getUserCurrentCalorieConsumption(
      fakeUserId,
      fakeStartDate,
      fakeEndDate
    );

    expect(result).toBe(0);
  });

  it("Should return 0 dates that are not in range for a userId", async () => {
    const fakeUserId = "656b4365e37d5230a938295c";
    const fakeStartDate = new Date(Date.UTC(2023, 10, 2, 0, 0, 0, 0));
    const fakeEndDate = new Date(Date.UTC(2023, 10, 2, 23, 59, 59, 999));

    const result = await foodDiaryRepo.getUserCurrentCalorieConsumption(
      fakeUserId,
      fakeStartDate,
      fakeEndDate
    );

    expect(result).toBe(0);
  });

  it("Should handle errors and log an error message", async () => {
    const userId = "fakeUserId";
    const startOfDay = new Date();
    const endOfDay = new Date();
    const errorMock = new Error("Mocked error message");

    jest.spyOn(FoodDiaryEntry, "find").mockImplementationOnce(() => {
      throw errorMock;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    try {
      await foodDiaryRepo.getUserCurrentCalorieConsumption(
        userId,
        startOfDay,
        endOfDay
      );

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe(errorMock);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error finding consumption info for ${userId}`
      );
    }

    consoleErrorSpy.mockRestore();
  });
});
