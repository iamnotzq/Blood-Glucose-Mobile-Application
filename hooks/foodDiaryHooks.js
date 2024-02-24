import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { foodDiaryStyles } from "../styles/foodDiaryStyles";
import FoodEntryComponent from "../components/foodEntryComponent";
import MedicationRecommendation from "../components/medicationRecommendation";

export const displayFoodEntries = (foodEntries) => {
  return foodEntries.map((entry, index) => {
    return <FoodEntryComponent index={index} entry={entry} />;
  });
};

export const renderFoodEntrySection = (foodEntries) => {
  if (foodEntries.length > 0) {
    return (
      <ScrollView
        style={foodDiaryStyles.foodEntryContainer}
        contentContainerStyle={foodDiaryStyles.foodEntryContentContainer}
      >
        {displayFoodEntries(foodEntries)}
      </ScrollView>
    );
  }

  return (
    <View style={foodDiaryStyles.textBoxContainer}>
      <Text style={foodDiaryStyles.textBoxText}>No food logs for today</Text>
      <Text></Text>
      <Text style={foodDiaryStyles.textBoxSubText}>
        Tap the 'New Entry' button to log your first meal of the day
      </Text>
    </View>
  );
};

export const calculateNutritionalDetails = (
  servingSize,
  calories,
  carbs,
  fat,
  sodium,
  fiber
) => {
  const calculatedCalories = calories * servingSize || calories;
  const calculatedCarbs = carbs * servingSize || carbs;
  const calculatedFat = fat * servingSize || fat;
  const calculatedProtein = sodium * servingSize || sodium;
  const calculatedFibre = fiber * servingSize || fiber;

  const units = parseFloat(calculatedCarbs / 15);
  return {
    calculatedCalories,
    calculatedCarbs,
    calculatedFat,
    calculatedProtein,
    calculatedFibre,
    units,
  };
};

export const renderBloodGlucosePrediction = (
  previousGlucoseLevel,
  currentCarbs,
  currentCalories,
  handleClick
) => {
  const glucoseCoefficient = 0.6;
  const carbsCoefficient = 0.5;
  const calorieCoefficient = 0.1;

  const predictedGlucoseLevel = parseInt(
    Math.round(
      glucoseCoefficient * previousGlucoseLevel +
        carbsCoefficient * currentCarbs +
        calorieCoefficient * currentCalories
    )
  );

  return (
    <MedicationRecommendation
      medicationName="Glucose Prediction"
      units={predictedGlucoseLevel}
      handleCirclePress={handleClick}
    />
  );
};

export const renderMedicationRecommendation = (
  medicationName,
  servingSize,
  consumptionPeriod,
  units
) => {
  const numServingSize = parseInt(servingSize);

  if (numServingSize > 0) {
    return (
      <MedicationRecommendation
        medicationName={medicationName}
        consumptionPeriod={consumptionPeriod}
        units={units}
      />
    );
  }

  return;
};

export const useNutritionalDetailsChartData = (initialData) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Day");

  const handleHeaderPress = (period) => {
    setSelectedPeriod(period);
  };

  const getChartData = () => {
    switch (selectedPeriod) {
      case "Week":
        return initialData.weekData;
      case "Month":
        return initialData.monthData;
      default:
        return initialData.dayData;
    }
  };

  return { selectedPeriod, handleHeaderPress, getChartData };
};
