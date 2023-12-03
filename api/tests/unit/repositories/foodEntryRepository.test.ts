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
import {
  CalorieDisplayDTO,
  DailyConsumptionInformation,
} from "../../../dtos/dashboardDTOs";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  console.log("Starting foodEntryRepository.test.ts");
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

  console.log("Completed foodEntryRepository.test.ts");
});

describe("calculateTotalCalories", () => {
  it("Should return the total number of calories when foodEntries is populated", () => {
    const expected = FakeFoodEntries.reduce(
      (sum, entry) => sum + entry.nutritionalContent.calories,
      0
    );

    const result = foodDiaryRepo.calculateTotalCalories(FakeFoodEntries);

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
    const fakeCurrentTimestamp = new Date(
      Date.UTC(2023, 11, 2, 12, 30, 59, 999)
    );
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
      fakeCurrentTimestamp
    );

    expect(result).toBe(expected);
  });

  it("Should return 0 for a userId that does not exist", async () => {
    const fakeUserId = "656b4365e37d5230a938295c";
    const fakeCurrentTimestamp = new Date(
      Date.UTC(2023, 11, 2, 12, 30, 59, 999)
    );
    const fakeStartDate = new Date(Date.UTC(2023, 11, 2, 0, 0, 0, 0));
    const fakeEndDate = new Date(Date.UTC(2023, 11, 2, 23, 59, 59, 999));

    const result = await foodDiaryRepo.getUserCurrentCalorieConsumption(
      fakeUserId,
      fakeCurrentTimestamp
    );

    expect(result).toBe(0);
  });

  it("Should return 0 dates that are not in range for a userId", async () => {
    const fakeUserId = "656b4365e37d5230a938295c";
    const fakeCurrentTimestamp = new Date(
      Date.UTC(2023, 11, 2, 12, 30, 59, 999)
    );
    const fakeStartDate = new Date(Date.UTC(2023, 10, 2, 0, 0, 0, 0));
    const fakeEndDate = new Date(Date.UTC(2023, 10, 2, 23, 59, 59, 999));

    const result = await foodDiaryRepo.getUserCurrentCalorieConsumption(
      fakeUserId,
      fakeCurrentTimestamp
    );

    expect(result).toBe(0);
  });

  it("Should handle errors and log an error message", async () => {
    const userId = "fakeUserId";
    const currentTimestamp = new Date();
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
        currentTimestamp
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

describe("getUserConsumptionHistory", () => {
  it("Should return an array of DailyConsumptionInformation", async () => {
    const fakeUserId = "656aed89594fc49ef5cac032";
    const fakeCurrentTimestamp = new Date(
      Date.UTC(2023, 11, 3, 23, 59, 59, 999)
    );

    const result = await foodDiaryRepo.getUserConsumptionHistory(
      fakeUserId,
      fakeCurrentTimestamp
    );

    expect(result).toBeDefined;
    expect(result.length).toBe(2);

    result.map((entry) => {
      const date = new Date(entry.dateString);
      const sevenDaysAgoTimestamp = new Date(fakeCurrentTimestamp);
      sevenDaysAgoTimestamp.setUTCDate(fakeCurrentTimestamp.getUTCDate() - 7);
      sevenDaysAgoTimestamp.setUTCHours(0, 0, 0, 0);
      const isWithinRange =
        date >= sevenDaysAgoTimestamp && date <= fakeCurrentTimestamp;

      expect(isWithinRange).toBe(true);
    });
  });

  it("Should handle errors and log an error message", async () => {
    const userId = "fakeUserId";
    const fakeCurrentTimestamp = new Date();
    const errorMock = new Error("Mocked error message");

    jest.spyOn(FoodDiaryEntry, "find").mockImplementationOnce(() => {
      throw errorMock;
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    try {
      await foodDiaryRepo.getUserConsumptionHistory(
        userId,
        fakeCurrentTimestamp
      );

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe(errorMock);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error finding consumption history for user: ${userId}`
      );
    }

    consoleErrorSpy.mockRestore();
  });
});

describe("getUserCalorieDisplayAssets", () => {
  it("should return CalorieDisplayDTO", async () => {
    const fakeUserId = "656aed89594fc49ef5cac032";
    const fakeCurrentTimestamp = new Date(
      Date.UTC(2023, 11, 3, 23, 59, 59, 999)
    );

    const expectedCalorieConsumption = 175;
    const expectedConsumptionHistory: DailyConsumptionInformation[] = [
      {
        dateString: "2023-12-02",
        dayOfWeek: "Saturday",
        totalCaloriesConsumed: 600,
      },
      {
        dateString: "2023-12-03",
        dayOfWeek: "Sunday",
        totalCaloriesConsumed: 175,
      },
    ];
    const expectedDTO: CalorieDisplayDTO = {
      currentCalorieConsumption: expectedCalorieConsumption,
      consumptionHistory: expectedConsumptionHistory,
    };

    jest
      .spyOn(foodDiaryRepo, "getUserCurrentCalorieConsumption")
      .mockResolvedValue(expectedCalorieConsumption);
    jest
      .spyOn(foodDiaryRepo, "getUserConsumptionHistory")
      .mockResolvedValue(expectedConsumptionHistory);

    const result = await foodDiaryRepo.getUserCalorieDisplayInformation(
      fakeUserId,
      fakeCurrentTimestamp
    );

    expect(result).toEqual(expectedDTO);
  });

  it("should handle errors and throw", async () => {
    const fakeUserId = "656aed89594fc49ef5cac032";
    const fakeCurrentTimestamp = new Date(
      Date.UTC(2023, 11, 3, 23, 59, 59, 999)
    );

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(async () => undefined);

    jest
      .spyOn(FoodDiaryEntry, "find")
      .mockRejectedValue(new Error("Fake error"));

    jest
      .spyOn(foodDiaryRepo, "getUserCurrentCalorieConsumption")
      .mockRejectedValue(new Error("Fake error"));

    await expect(
      foodDiaryRepo.getUserCalorieDisplayInformation(
        fakeUserId,
        fakeCurrentTimestamp
      )
    ).rejects.toThrowError("Fake error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error in receiving calorie display assets for user: ${fakeUserId}`
    );

    consoleErrorSpy.mockRestore();
  });
});
