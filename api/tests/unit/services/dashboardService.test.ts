import User, { UserDocument } from "../../../repositories/models/user";
import * as foodEntryRepo from "../../../repositories/foodEntryRepository";
import * as bloodGlucoseRepo from "../../../repositories/bloodGlucoseEntryRepository";
import * as dashboardService from "../../../services/dashboardService";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import * as fakes from "./fakes";
import {
  BloodGlucoseDisplayAssets,
  BloodGlucoseSummary,
  DailyBloodGlucoseInformation,
  DashboardDisplayAssets,
} from "../../../dtos/dashboardDTOs";

jest.mock("../../../repositories/foodEntryRepository");
jest.mock("../../../repositories/models/user");
jest.mock("../../../repositories/bloodGlucoseEntryRepository");

describe("dashboardService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getUserCalorieGoal", () => {
    const fakeUser: UserDocument = {
      username: "fake-username",
      email: "fake-email@email.com",
      password: "fake-password",
      firstName: "John",
      lastName: "Doe",
      country: "Singapore",
      age: 25,
      gender: "M",
      weightKg: 65,
      heightCm: 170,
      diabetesType: "Type 1",
      medicationList: ["fake-medication"],
      caloricGoalKcal: 2000,
      hyperMgDl: 140,
      hypoMgDl: 70,
      targetLowerMgDl: 90,
      targetUpperMgDl: 120,
    } as UserDocument;

    const fakeUserId = fakes.fakeUserId;

    test("Should return caloricGoal for valid user", async () => {
      jest.spyOn(User, "findById").mockResolvedValue(fakeUser);
      const expected = fakeUser.caloricGoalKcal;

      const result = await dashboardService.getUserCalorieGoal(fakeUserId);

      expect(result).toBe(expected);
    });

    test("Should return 0 when a user does not have a caloric goal", async () => {
      const fakeUserWithoutCaloricGoal: UserDocument = {
        username: "fake-username",
        email: "fake-email@email.com",
        password: "fake-password",
        firstName: "John",
        lastName: "Doe",
        country: "Singapore",
        age: 25,
        gender: "M",
        weightKg: 65,
        heightCm: 170,
        diabetesType: "Type 1",
        medicationList: ["fake-medication"],
        caloricGoalKcal: undefined,
        hyperMgDl: 140,
        hypoMgDl: 70,
        targetLowerMgDl: 90,
        targetUpperMgDl: 120,
      } as UserDocument;

      jest
        .spyOn(User, "findById")
        .mockResolvedValue(fakeUserWithoutCaloricGoal);
      const expected = 0;

      const result = await dashboardService.getUserCalorieGoal(fakeUserId);

      expect(result).toBe(expected);
    });

    test("Should throw error when a user cannot be found", async () => {
      jest.spyOn(User, "findById").mockResolvedValue(null);

      const errorMessage = `User not found for: ${fakeUserId}`;

      await expect(
        dashboardService.getUserCalorieGoal(fakeUserId)
      ).rejects.toThrow(errorMessage);
    });

    test("Should throw error for other unforseen errors", async () => {
      const mockErrorMessage = "Mock Error";
      const mockError = new Error(mockErrorMessage);

      jest.spyOn(User, "findById").mockRejectedValue(mockError);
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(async () => undefined);

      const expectedErrorMessage = `Error in retrieving caloric goal for user: ${fakeUserId}`;

      await expect(
        dashboardService.getUserCalorieGoal(fakeUserId)
      ).rejects.toThrow(mockError);

      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);

      consoleErrorSpy.mockRestore();
    });
  });

  describe("getUserCalorieDisplayAssets", () => {
    const fakeUser = fakes.fakeUser;
    const fakeUserId = fakes.fakeUserId;

    test("Should return CalorieDisplayAssets for a valid userId", async () => {
      (User.find as jest.Mock).mockImplementation(async () => fakeUser);
      const calorieDisplayInfoSpy = jest
        .spyOn(foodEntryRepo, "getUserCalorieDisplayInformation")
        .mockResolvedValue(fakes.fakeCalorieDisplayDTO);

      (User.findById as jest.Mock).mockImplementation(async () => fakeUser);
      jest
        .spyOn(dashboardService, "getUserCalorieGoal")
        .mockResolvedValue(fakes.fakeCalorieGoal);

      const expected = fakes.fakeCalorieDisplayAssets;

      const result = await dashboardService.getUserCalorieDisplayAssets(
        fakeUserId
      );

      expect(result).toStrictEqual(expected);
    });

    test("Should throw error when getUserCalorieDisplayInformation throws error", async () => {
      const mockErrorMessage = "Mock Error";
      const mockError = new Error(mockErrorMessage);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(async () => undefined);

      const calorieDisplayInfoSpy = jest
        .spyOn(foodEntryRepo, "getUserCalorieDisplayInformation")
        .mockRejectedValue(() => {
          throw mockError;
        });

      await expect(
        dashboardService.getUserCalorieDisplayAssets(fakeUserId)
      ).rejects.toThrow(mockError);

      const expectedErrorMessage = `Unable to get calorie display assets for user: ${fakeUserId}`;
      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);

      consoleErrorSpy.mockRestore;
    });

    test("Should throw error when getUserCalorieGoal throws error", async () => {
      const mockErrorMessage = `User not found for: ${fakeUserId}`;
      const mockError = new Error(mockErrorMessage);

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(async () => undefined);

      jest
        .spyOn(dashboardService, "getUserCalorieGoal")
        .mockImplementation(async () => {
          throw mockError;
        });

      await expect(
        dashboardService.getUserCalorieDisplayAssets(fakeUserId)
      ).rejects.toThrow(mockError);

      const expectedErrorMessage = `Unable to get calorie display assets for user: ${fakeUserId}`;
      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);

      consoleErrorSpy.mockRestore;
    });
  });

  describe("getUserBloodGlucoseDisplayAssets", () => {
    const userId = fakes.fakeUserId;
    const summary = fakes.fakeBloodGlucoseSummary;
    const history = fakes.fakeBloodGlucoseHistory;

    test("Should return populated BloodGlucoseDisplayAssets when all info is present", async () => {
      const summarySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserRecentGlucoseSummary")
        .mockResolvedValueOnce(summary);

      const historySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserBloodGlucoseHistory")
        .mockResolvedValueOnce(history);

      const expected: BloodGlucoseDisplayAssets = {
        latestMeasurement: summary.currentGlucoseLevel,
        previousMeasurement: summary.previousGlucoseLevel,
        averageMeasurement: summary.averageGlucoseLevel,
        measurementHistory: history,
      };

      const result = await dashboardService.getUserBloodGlucoseDisplayAssets(
        userId
      );

      expect(expected).toStrictEqual(result);
    });

    test("Should return 0 for measurements when no entries can be found", async () => {
      const fakeEmptySummary: BloodGlucoseSummary = {
        currentGlucoseLevel: 0,
        previousGlucoseLevel: 0,
        averageGlucoseLevel: 0,
      };

      const summarySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserRecentGlucoseSummary")
        .mockResolvedValueOnce(fakeEmptySummary);

      const fakeEmptyHistory: DailyBloodGlucoseInformation[] = [];

      const historySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserBloodGlucoseHistory")
        .mockResolvedValueOnce(fakeEmptyHistory);

      const expected: BloodGlucoseDisplayAssets = {
        latestMeasurement: fakeEmptySummary.currentGlucoseLevel,
        previousMeasurement: fakeEmptySummary.previousGlucoseLevel,
        averageMeasurement: fakeEmptySummary.averageGlucoseLevel,
        measurementHistory: fakeEmptyHistory,
      };

      const result = await dashboardService.getUserBloodGlucoseDisplayAssets(
        userId
      );

      expect(expected).toStrictEqual(result);
    });

    test("Should populate for currentGlucoseLevel, averageGlucoseLevel and measurementHistory when only 1 entry is found", async () => {
      const fakeEmptySummary: BloodGlucoseSummary = {
        currentGlucoseLevel: 150,
        previousGlucoseLevel: 0,
        averageGlucoseLevel: 150,
      };

      const summarySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserRecentGlucoseSummary")
        .mockResolvedValueOnce(fakeEmptySummary);

      const fakeEmptyHistory: DailyBloodGlucoseInformation[] = [
        {
          dateString: "2023-12-03",
          dayOfWeek: "Sunday",
          averageGlucoseLevel: fakeEmptySummary.averageGlucoseLevel,
        },
      ];

      const historySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserBloodGlucoseHistory")
        .mockResolvedValueOnce(fakeEmptyHistory);

      const expected: BloodGlucoseDisplayAssets = {
        latestMeasurement: fakeEmptySummary.currentGlucoseLevel,
        previousMeasurement: fakeEmptySummary.previousGlucoseLevel,
        averageMeasurement: fakeEmptySummary.averageGlucoseLevel,
        measurementHistory: fakeEmptyHistory,
      };

      const result = await dashboardService.getUserBloodGlucoseDisplayAssets(
        userId
      );

      expect(expected).toStrictEqual(result);
    });

    test("Should handle errors", async () => {
      const mockErrorMessage = "Mock Error";
      const mockError = new Error(mockErrorMessage);

      const summarySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserRecentGlucoseSummary")
        .mockImplementation(async () => {
          throw mockError;
        });

      await expect(
        dashboardService.getUserBloodGlucoseDisplayAssets(userId)
      ).rejects.toThrow(mockError);
    });
  });

  describe("getDashboardAssets", () => {
    const userId = fakes.fakeUserId;
    const user = fakes.fakeUser;

    const calorieDisplayInfo = fakes.fakeCalorieDisplayDTO;
    const glucoseSummary = fakes.fakeBloodGlucoseSummary;
    const glucoseHistory = fakes.fakeBloodGlucoseHistory;

    const calorieGoal = fakes.fakeCalorieGoal;
    const calorieAssets = fakes.fakeCalorieDisplayAssets;
    const glucoseAssets = fakes.fakeBloodGlucoseDisplayAssets;

    test("Should return DashboardDisplayAssets for valid fields", async () => {
      const calorieDisplayInfoSpy = jest
        .spyOn(foodEntryRepo, "getUserCalorieDisplayInformation")
        .mockResolvedValue(calorieDisplayInfo);

      (User.findById as jest.Mock).mockImplementation(async () => user);
      const calorieGoalSpy = jest
        .spyOn(dashboardService, "getUserCalorieGoal")
        .mockResolvedValue(calorieGoal);

      const calorieAssetsSpy = jest
        .spyOn(dashboardService, "getUserCalorieDisplayAssets")
        .mockResolvedValue(calorieAssets);

      const glucoseSummarySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserRecentGlucoseSummary")
        .mockResolvedValue(glucoseSummary);

      const glucoseHistorySpy = jest
        .spyOn(bloodGlucoseRepo, "getUserBloodGlucoseHistory")
        .mockResolvedValue(glucoseHistory);

      const glucoseAssetsSpy = jest
        .spyOn(dashboardService, "getUserBloodGlucoseDisplayAssets")
        .mockResolvedValue(glucoseAssets);

      const expected: DashboardDisplayAssets = {
        calorieDisplayAssets: calorieAssets,
        bloodGlucoseDisplayAssets: glucoseAssets,
      };

      const result = await dashboardService.getDashboardAssets(userId);

      expect(result).toStrictEqual(expected);
      expect(foodEntryRepo.getUserCalorieDisplayInformation).toHaveBeenCalled();
      expect(bloodGlucoseRepo.getUserRecentGlucoseSummary).toHaveBeenCalled();
      expect(bloodGlucoseRepo.getUserBloodGlucoseHistory).toHaveBeenCalled();
    });

    test("Should handle errors", async () => {
      const mockErrorMessage = `Unable to retrieve dashboard assets for user: ${userId}`;
      const mockError = new Error(mockErrorMessage);

      const summarySpy = jest
        .spyOn(dashboardService, "getUserBloodGlucoseDisplayAssets")
        .mockRejectedValue(async () => {
          throw mockError;
        });

      await expect(
        dashboardService.getDashboardAssets(userId)
      ).rejects.toThrowError(mockError);
    });
  });
});
