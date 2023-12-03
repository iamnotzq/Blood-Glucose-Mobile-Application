import { User, UserDocument } from "../../../repositories/models/user";
import { getUserCalorieDisplayInformation } from "../../../repositories/foodEntryRepository";
import * as dashboardService from "../../../services/dashboardService";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import * as fakes from "./fakes";

jest.mock("../../../repositories/foodEntryRepository");
jest.mock("../../../repositories/models/user");

beforeEach(() => {
  jest.clearAllMocks();
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

  it("Should return caloricGoal for valid user", async () => {
    (User.findById as jest.Mock).mockImplementation(async () => fakeUser);
    const expected = fakeUser.caloricGoalKcal;

    const result = await dashboardService.getUserCalorieGoal(fakeUserId);

    expect(result).toBe(expected);
  });

  it("Should return 0 when a user does not have a caloric goal", async () => {
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

    (User.findById as jest.Mock).mockImplementation(
      async () => fakeUserWithoutCaloricGoal
    );
    const expected = 0;

    const result = await dashboardService.getUserCalorieGoal(fakeUserId);

    expect(result).toBe(expected);
  });

  it("Should throw error when a user cannot be found", async () => {
    (User.findById as jest.Mock).mockImplementation(async () => null);

    const errorMessage = `User not found for: ${fakeUserId}`;

    await expect(
      dashboardService.getUserCalorieGoal(fakeUserId)
    ).rejects.toThrow(errorMessage);
  });

  it("Should throw error for other unforseen errors", async () => {
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

  it("Should return CalorieDisplayAssets for a valid userId", async () => {
    (User.find as jest.Mock).mockImplementation(async () => fakeUser);
    (getUserCalorieDisplayInformation as jest.Mock).mockImplementation(
      async () => fakes.fakeCalorieDisplayDTO
    );

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

  it("Should throw error when getUserCalorieDisplayInformation throws error", async () => {
    const mockErrorMessage = "Mock Error";
    const mockError = new Error(mockErrorMessage);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(async () => undefined);

    (getUserCalorieDisplayInformation as jest.Mock).mockImplementation(
      async () => {
        throw mockError;
      }
    );

    await expect(
      dashboardService.getUserCalorieDisplayAssets(fakeUserId)
    ).rejects.toThrow(mockError);

    const expectedErrorMessage = `Unable to get calorie display assets for user: ${fakeUserId}`;
    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);

    consoleErrorSpy.mockRestore;
  });

  it("Should throw error when getUserCalorieGoal throws error", async () => {
    const mockErrorMessage = "Mock Error";
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
