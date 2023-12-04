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
} from "@jest/globals";
import mongoose, { mongo } from "mongoose";
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
import { BloodGlucoseSummary } from "../../../dtos/dashboardDTOs";
import { calculateAverageHelper } from "./Helpers";

let mongoServer: MongoMemoryServer;

describe("bloodGlucoseEntryRepository", () => {
  beforeAll(async () => {
    console.log("Starting bloodGlucoseEntryRepository.test.ts");
    mongoServer = new MongoMemoryServer();
    const uri = process.env.MONGO_URI as string;

    console.log("Connecting to MongoDB...");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");

    await BloodGlucoseEntry.insertMany(MockBloodGlucoseEntries);
    console.log("Mock data inserted");
  }, 45000);

  afterAll(async () => {
    await BloodGlucoseEntry.deleteMany();
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

      jest.spyOn(BloodGlucoseEntry, "find").mockResolvedValue([mockEntry]);

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
});
