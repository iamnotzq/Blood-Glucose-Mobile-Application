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
