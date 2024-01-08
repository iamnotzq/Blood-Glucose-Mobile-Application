import {
  GetAnalysisAssetsResponseBody,
  GetUserGlucoseLevelsResponseBody,
} from "../routes/models/responses/responseBodies";
import { getUserCalorieGoal } from "./dashboardService";
import { getUserGlucoseRange } from "./userService";
import { getUserCurrentCalorieConsumption } from "../repositories/foodEntryRepository";
import { getUserCurrentBloodGlucoseLevels } from "../repositories/bloodGlucoseEntryRepository";

export const getAnalysisAssets = async (
  id: string
): Promise<GetAnalysisAssetsResponseBody> => {
  try {
    const caloricGoal = await getUserCalorieGoal(id);
    const caloricLower = caloricGoal * 0.8;
    const caloricUpper = caloricGoal * 1.1;

    const glucoseLevels: GetUserGlucoseLevelsResponseBody =
      await getUserGlucoseRange(id);

    const timestamp = new Date();

    const currentCalorieIntake = await getUserCurrentCalorieConsumption(
      id,
      timestamp
    );

    const currentBloodGlucoseLevels = await getUserCurrentBloodGlucoseLevels(
      id,
      timestamp
    );

    const caloricRangeIndex = calculateRangeIndex(
      caloricLower,
      caloricUpper,
      currentCalorieIntake
    );

    const bloodGlucoseRangeIndex = calculateRangeIndex(
      glucoseLevels.lowerLevel,
      glucoseLevels.upperLevel,
      currentBloodGlucoseLevels
    );

    const assets = {
      caloricRangeIndex: caloricRangeIndex,
      bloodGlucoseRangeIndex: bloodGlucoseRangeIndex,
    };

    return assets;
  } catch (error: any) {
    throw error;
  }
};

export const calculateRangeIndex = (
  lower: number,
  upper: number,
  current: number
): number => {
  if (current === 0) {
    return 0;
  } else if (current > 0 && current < lower) {
    return 1;
  } else if (current >= lower && current <= upper) {
    return 2;
  } else {
    return 3;
  }
};
