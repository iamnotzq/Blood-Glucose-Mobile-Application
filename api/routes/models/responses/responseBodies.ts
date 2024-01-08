export type NewUserResponseBody = {
  isValid: boolean;
  status: number;
  message: string;
};

export type AddFoodDiaryEntryResponseBody = {
  calories: number;
  carbohydrates: number;
  sodium: number;
  fat: number;
  fiber: number;
};

export type GetUserGlucoseLevelsResponseBody = {
  lowerLevel: number;
  upperLevel: number;
};

export type GetAnalysisAssetsResponseBody = {
  caloricRangeIndex: number;
  bloodGlucoseRangeIndex: number;
};
