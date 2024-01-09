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

export type BloodGlucoseChartData = {
  dayString: string;
  glucoseLevel: number;
};

export type BloodGlucoseChartAssets = {
  array: BloodGlucoseChartData[];
  average: number;
};

export type GetBloodGlucoseChartDataResponseBody = {
  daily: BloodGlucoseChartAssets;
  weekly: BloodGlucoseChartAssets;
  monthly: BloodGlucoseChartAssets;
};

// export type GetBloodGlucoseChartDataResponseBody = {
//   daily: BloodGlucoseChartData[];
//   weekly: BloodGlucoseChartData[];
//   monthly: BloodGlucoseChartData[];
// };
