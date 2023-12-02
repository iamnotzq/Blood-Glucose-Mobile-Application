class CalorieDisplay {
    dailyGoal: number
    calEaten: number
    calLeft: number
    dailyProgress: number
    consumptionHistory: number[]
    constructor(
        dailyGoal: number,
        calEaten: number,
        calLeft: number,
        dailyProgress: number,
        consumptionHistory: number[]
    ) {
        this.dailyGoal = dailyGoal;
        this.calEaten = calEaten;
        this.calLeft = calLeft;
        this.dailyProgress = dailyProgress;
        this.consumptionHistory = consumptionHistory;
    }
}

class BloodGlucoseDisplay {
    latestMeasurement: number
    previousMeasurement: number
    averageMeasurement: number
    measurementHistory: number[]
    constructor(
        latestMeasurement: number,
        previousMeasurement: number,
        averageMeasurement: number,
        measurementHistory: number[]
    ) {
        this.latestMeasurement = latestMeasurement;
        this.previousMeasurement = previousMeasurement;
        this.averageMeasurement = averageMeasurement;
        this.measurementHistory = measurementHistory;
    }
}

class DashboardAssets {
    calorieDisplay: CalorieDisplay
    bloodGlucoseDisplay: BloodGlucoseDisplay
    constructor(
        calorieDisplay: CalorieDisplay,
        bloodGlucoseDisplay: BloodGlucoseDisplay
    ) {
        this.calorieDisplay = calorieDisplay;
        this.bloodGlucoseDisplay = bloodGlucoseDisplay;
    }
}

export { CalorieDisplay, BloodGlucoseDisplay, DashboardAssets };
