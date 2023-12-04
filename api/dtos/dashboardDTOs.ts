interface DailyConsumptionInformation {
  dateString: string;
  dayOfWeek: string;
  totalCaloriesConsumed: number;
}

interface CalorieDisplayDTO {
  currentCalorieConsumption: number;
  consumptionHistory: DailyConsumptionInformation[];
}

interface CalorieDisplayAssets {
  calGoal: number;
  calEaten: number;
  calLeft: number;
  dailyProgress: number;
  consumptionHistory: DailyConsumptionInformation[];
}

export { DailyConsumptionInformation, CalorieDisplayDTO, CalorieDisplayAssets };
