export type LoginRequestBody = {
  email: string;
  password: string;
};

export type NewUserRequestBody = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateUserRequestBody = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  age: number;
  gender: string;
  weightKg: number;
  heightCm: number;
  diabetesType: string;
  medicationList: string[];
  caloricGoalKcal?: number;
  hyperMgDl: number;
  hypoMgDl: number;
  targetLowerMgDl: number;
  targetUpperMgDl: number;
};

export type AddBloodGlucoseEntryRequestBody = {
  userId: string;
  timestamp: Date;
  glucoseLevel: number;
};

export type AddFoodDiaryEntryRequestBody = {
  userId: string;
  foodName: string;
  timestamp: Date;
  portionSize: number;
  mealType: string;
  mealDescription: string;
};
