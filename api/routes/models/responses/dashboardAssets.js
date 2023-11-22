class CalorieDisplay {
  constructor(dailyGoal, calEaten, calLeft, dailyProgress, consumptionHistory) {
    this.dailyGoal = dailyGoal;
    this.calEaten = calEaten;
    this.calLeft = calLeft;
    this.dailyProgress = dailyProgress;
    this.consumptionHistory = consumptionHistory;
  }
}

class BloodGlucoseDisplay {
  constructor(
    latestMeasurement,
    previousMeasurement,
    averageMeasurement,
    measurementHistory
  ) {
    this.latestMeasurement = latestMeasurement;
    this.previousMeasurement = previousMeasurement;
    this.averageMeasurement = averageMeasurement;
    this.measurementHistory = measurementHistory;
  }
}

class DashboardAssets {
  constructor(calorieDisplay, bloodGlucoseDisplay) {
    this.calorieDisplay = calorieDisplay;
    this.bloodGlucoseDisplay = bloodGlucoseDisplay;
  }
}

module.exports = { CalorieDisplay, BloodGlucoseDisplay, DashboardAssets };
