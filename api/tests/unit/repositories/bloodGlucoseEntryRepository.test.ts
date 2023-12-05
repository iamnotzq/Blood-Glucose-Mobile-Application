import { config } from "dotenv";
config();
import {
  jest,
  describe,
  test,
  beforeAll,
  expect,
  afterAll,
  afterEach,
  beforeEach,
} from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import BloodGlucoseEntry, {
  BloodGlucoseEntryDocument,
} from "../../../repositories/models/bloodGlucoseEntry";
import * as bloodGlucoseEntryRepo from "../../../repositories/bloodGlucoseEntryRepository";
import {
  MockBloodGlucoseEntries,
  FakeBloodGlucoseEntries,
  FakeTimestamp,
  FakeUserId,
} from "./Fakes";
import {
  BloodGlucoseSummary,
  DailyBloodGlucoseInformation,
} from "../../../dtos/dashboardDTOs";
import { calculateAverageHelper } from "./Helpers";
import { expectedBloodGlucoseHistory } from "./expecteResults";

let mongoServer: MongoMemoryServer;

describe("bloodGlucoseEntryRepository", () => {
  beforeAll(async () => {
    console.log("Starting bloodGlucoseEntryRepository.test.ts");
    mongoServer = new MongoMemoryServer();
    const uri = process.env.MONGO_URI as string;

    console.log("Connecting to MongoDB...");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  }, 45000);

  beforeEach(async () => {
    await BloodGlucoseEntry.insertMany(MockBloodGlucoseEntries);
    jest.restoreAllMocks();
    console.log("Mock data inserted");
  });

  afterEach(async () => {
    await BloodGlucoseEntry.deleteMany();
    console.log("Mock data deleted");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  }, 30000);

  describe("calculateAverageGlucoseLevel", () => {
    const entries: BloodGlucoseEntryDocument[] = FakeBloodGlucoseEntries;

    test("Should return the average glucose level", () => {
      const expected = calculateAverageHelper(entries);

      const result =
        bloodGlucoseEntryRepo.calculateAverageGlucoseLevel(entries);

      expect(result).toBe(expected);
    });
  });

  describe("getUserRecentGlucoseSummary", () => {
    const userId = FakeUserId;
    const currentTimestamp = FakeTimestamp;
    const expectedStartOfDay = new Date(currentTimestamp);
    expectedStartOfDay.setUTCHours(0, 0, 0, 0);
    const expectedEndOfDay = new Date(currentTimestamp);
    expectedEndOfDay.setUTCHours(23, 59, 59, 999);

    test("Should return a BloodGlucoseSummary with populated fields", async () => {
      const expectedEntries: BloodGlucoseEntryDocument[] =
        MockBloodGlucoseEntries.filter(
          (entry) =>
            entry.userId === userId &&
            entry.timestamp >= expectedStartOfDay &&
            entry.timestamp <= expectedEndOfDay
        );
      expectedEntries.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );

      const expectedCurrentLevel = expectedEntries[0].glucoseLevel;
      const expectedPreviousLevel = expectedEntries[1].glucoseLevel;
      const expectedAverage = calculateAverageHelper(expectedEntries);
      const expectedResult: BloodGlucoseSummary = {
        currentGlucoseLevel: expectedCurrentLevel,
        previousGlucoseLevel: expectedPreviousLevel,
        averageGlucoseLevel: expectedAverage,
      };
      const result = await bloodGlucoseEntryRepo.getUserRecentGlucoseSummary(
        userId,
        currentTimestamp
      );

      expect(expectedResult).toStrictEqual(result);
    });

    test("Should return a BloodGlucoseSummary with all fields 0 if entries is empty", async () => {
      jest.spyOn(BloodGlucoseEntry, "find").mockResolvedValue([]);

      const expectedResult: BloodGlucoseSummary = {
        currentGlucoseLevel: 0,
        previousGlucoseLevel: 0,
        averageGlucoseLevel: 0,
      };

      const result = await bloodGlucoseEntryRepo.getUserRecentGlucoseSummary(
        userId,
        currentTimestamp
      );

      expect(expectedResult).toStrictEqual(result);
    });

    test("previousGlucoseLevel is the only field that is 0 when entries has 1 entry", async () => {
      const mockEntry: BloodGlucoseEntryDocument = {
        userId: FakeUserId,
        timestamp: new Date(Date.UTC(2023, 11, 23, 23, 0, 0, 0)),
        glucoseLevel: 150,
      } as BloodGlucoseEntryDocument;

      const findSpy = jest
        .spyOn(BloodGlucoseEntry, "find")
        .mockResolvedValue([mockEntry]);

      const expectedResult: BloodGlucoseSummary = {
        currentGlucoseLevel: mockEntry.glucoseLevel,
        previousGlucoseLevel: 0,
        averageGlucoseLevel: mockEntry.glucoseLevel,
      };

      const result = await bloodGlucoseEntryRepo.getUserRecentGlucoseSummary(
        userId,
        currentTimestamp
      );

      expect(expectedResult).toStrictEqual(result);
    });

    test("Should handle errors and log error message", async () => {
      const mockErrorMessage = "Mock Error";
      const mockError = new Error(mockErrorMessage);
      jest.spyOn(BloodGlucoseEntry, "find").mockRejectedValueOnce(() => {
        throw mockError;
      });

      await expect(
        bloodGlucoseEntryRepo.getUserRecentGlucoseSummary(
          userId,
          currentTimestamp
        )
      ).rejects.toThrow(mockErrorMessage);
    });
  });

  describe("getUserBloodGlucoseHistory", () => {
    const userId = FakeUserId;
    const currentTimestamp = FakeTimestamp;

    test("Should return an array of DailyBloodGlucoseInformation", async () => {
      const expectedFiveDaysAgoTimestamp = new Date(currentTimestamp);
      expectedFiveDaysAgoTimestamp.setUTCDate(
        currentTimestamp.getUTCDate() - 5
      );
      expectedFiveDaysAgoTimestamp.setUTCHours(0, 0, 0, 0);

      const expectedQuery = {
        userId: userId,
        timestamp: {
          $gte: expectedFiveDaysAgoTimestamp,
          $lte: currentTimestamp,
        },
      };

      const findSpy = jest.spyOn(BloodGlucoseEntry, "find");

      const expectedEntries: BloodGlucoseEntryDocument[] =
        MockBloodGlucoseEntries.filter(
          (entry) =>
            entry.userId === userId &&
            entry.timestamp >= expectedFiveDaysAgoTimestamp &&
            entry.timestamp <= currentTimestamp
        );
      expectedEntries.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );

      const expectedResult: DailyBloodGlucoseInformation[] = JSON.parse(
        expectedBloodGlucoseHistory
      );

      const result = await bloodGlucoseEntryRepo.getUserBloodGlucoseHistory(
        userId,
        currentTimestamp
      );

      console.log(`Expected: ${expectedBloodGlucoseHistory}`);
      console.log(`Result: ${JSON.stringify(result)}`);

      expect(findSpy).toHaveBeenCalledWith(expectedQuery);
      expect(result).toStrictEqual(expectedResult);
    });

    test("Should return an array of the current DailyBloodGlucoseInformation entries is empty", async () => {
      const expectedDateString = currentTimestamp.toISOString().split("T")[0];
      const expectedOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
      const expectedLocale = "en-US";
      const expectedDayOfWeek = currentTimestamp.toLocaleDateString(
        expectedLocale,
        expectedOptions
      );
      const expectedCurrentGlucoseInformation: DailyBloodGlucoseInformation = {
        dateString: expectedDateString,
        dayOfWeek: expectedDayOfWeek,
        averageGlucoseLevel: 0,
      };
      const expected = [expectedCurrentGlucoseInformation];

      jest.spyOn(BloodGlucoseEntry, "find").mockResolvedValue([]);

      const result = await bloodGlucoseEntryRepo.getUserBloodGlucoseHistory(
        userId,
        currentTimestamp
      );

      expect(result).toStrictEqual(expected);
    });

    test("Should handle errors and log error message", async () => {
      const mockErrorMessage = "Mock Error";
      const mockError = new Error(mockErrorMessage);
      jest.spyOn(BloodGlucoseEntry, "find").mockRejectedValueOnce(() => {
        throw mockError;
      });

      await expect(
        bloodGlucoseEntryRepo.getUserBloodGlucoseHistory(
          userId,
          currentTimestamp
        )
      ).rejects.toThrow(mockErrorMessage);
    });
  });
});
