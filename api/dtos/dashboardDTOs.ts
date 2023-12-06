export interface DailyConsumptionInformation {
  dateString: string;
  dayOfWeek: string;
  totalCaloriesConsumed: number;
}

export interface CalorieDisplayDTO {
  currentCalorieConsumption: number;
  consumptionHistory: DailyConsumptionInformation[];
}

export interface CalorieDisplayAssets {
  calGoal: number;
  calEaten: number;
  calLeft: number;
  dailyProgress: number;
  consumptionHistory: DailyConsumptionInformation[];
}

export interface BloodGlucoseSummary {
  currentGlucoseLevel: number;
  previousGlucoseLevel: number;
  averageGlucoseLevel: number;
}

export interface DailyBloodGlucoseInformation {
  dateString: string;
  dayOfWeek: string;
  averageGlucoseLevel: number;
}

export interface BloodGlucoseDisplayAssets {
  latestMeasurement: number;
  previousMeasurement: number;
  averageMeasurement: number;
  measurementHistory: DailyBloodGlucoseInformation[];
}

export interface DashboardDisplayAssets {
  calorieDisplayAssets: CalorieDisplayAssets;
  bloodGlucoseDisplayAssets: BloodGlucoseDisplayAssets;
}
