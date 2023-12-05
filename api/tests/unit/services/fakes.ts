import {
  DailyConsumptionInformation,
  CalorieDisplayAssets,
  CalorieDisplayDTO,
  BloodGlucoseSummary,
  DailyBloodGlucoseInformation,
} from "../../../dtos/dashboardDTOs";

import { UserDocument } from "../../../repositories/models/user";

export const fakeUser: UserDocument = {
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

export const fakeCurrentTimestamp = new Date(Date.UTC(2023, 11, 3, 0, 0, 0, 0));

export const fakeUserId = "656aed89594fc49ef5cac032";

export const fakeCalorieGoal = 2000;

export const fakeCaloriesEaten = 500;

export const fakeCaloriesLeft = fakeCalorieGoal - fakeCaloriesEaten;

export const fakeDailyProgress = fakeCaloriesEaten / fakeCalorieGoal;

export const fakeConsumptionHistory: DailyConsumptionInformation[] = [
  {
    dateString: "2023-12-29",
    dayOfWeek: "Wednesday",
    totalCaloriesConsumed: 1900,
  },
  {
    dateString: "2023-11-30",
    dayOfWeek: "Thursday",
    totalCaloriesConsumed: 1800,
  },
  {
    dateString: "2023-12-01",
    dayOfWeek: "Friday",
    totalCaloriesConsumed: 1950,
  },
  {
    dateString: "2023-12-02",
    dayOfWeek: "Saturday",
    totalCaloriesConsumed: 2100,
  },
  {
    dateString: "2023-12-03",
    dayOfWeek: "Sunday",
    totalCaloriesConsumed: 2000,
  },
];

export const fakeCalorieDisplayDTO: CalorieDisplayDTO = {
  currentCalorieConsumption: fakeCaloriesEaten,
  consumptionHistory: fakeConsumptionHistory,
};

export const fakeCalorieDisplayAssets: CalorieDisplayAssets = {
  calGoal: fakeCalorieGoal,
  calEaten: fakeCaloriesEaten,
  calLeft: fakeCaloriesLeft,
  dailyProgress: fakeDailyProgress,
  consumptionHistory: fakeConsumptionHistory,
};

export const fakeBloodGlucoseSummary: BloodGlucoseSummary = {
  currentGlucoseLevel: 130,
  previousGlucoseLevel: 140,
  averageGlucoseLevel: 135,
};

export const fakeBloodGlucoseHistory: DailyBloodGlucoseInformation[] = [
  {
    dateString: "2023-12-03",
    dayOfWeek: "Sunday",
    averageGlucoseLevel: 135,
  },
  {
    dateString: "2023-12-02",
    dayOfWeek: "Saturday",
    averageGlucoseLevel: 140,
  },
  {
    dateString: "2023-12-01",
    dayOfWeek: "Friday",
    averageGlucoseLevel: 120,
  },
  {
    dateString: "2023-11-30",
    dayOfWeek: "Thursday",
    averageGlucoseLevel: 125,
  },
  {
    dateString: "2023-11-29",
    dayOfWeek: "Wednesday",
    averageGlucoseLevel: 120,
  },
];
