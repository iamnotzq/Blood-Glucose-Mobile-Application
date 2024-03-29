import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import UserParticularsScreen from "../screens/onboarding/UserParticularsScreen";
import UserMeasurementsScreen from "../screens/onboarding/UserMeasurementsScreen";
import UserDiabetesScreen from "../screens/onboarding/UserDiabetesScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../screens/ProfileScreen";
import FoodDiaryScreen from "../screens/foodDiary/FoodDiaryScreen";
import FoodEntrySummaryScreen from "../screens/foodDiary/FoodEntrySummaryScreen";
import NewFoodEntryScreen from "../screens/foodDiary/NewFoodEntryScreen";
import CommonLayout from "../screens/CommonLayout";
import BloodGlucoseRecordsScreen from "../screens/bloodGlucose/BloodGlucoseRecordsScreen";
import NewBloodGlucoseRecordScreen from "../screens/bloodGlucose/NewBloodGlucoseRecordScreen";
import DashboardScreen from "../screens/DashboardScreen";
import UserGlucoseLevelsScreen from "../screens/onboarding/UserGlucoseLevelsScreen";
import BloodGlucoseChartScreen from "../screens/bloodGlucose/BloodGlucoseChartScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import MedicationScreen from "../screens/MedicationScreen";
import AddMedicationScreen from "../screens/AddMedicationScreen";
import HealthcareProviderScreen from "../screens/HealthcareProviderScreen";
import GlucoseInfoScreen from "../screens/MoreInfoScreen";
import NutritionalDetailsChartScreen from "../screens/NutritionalDetailsChartScreen";
import MoreInfoScreen from "../screens/MoreInfoScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import GlucoseEditScreen from "../screens/GlucoseEditScreen";
import NutritionEditScreen from "../screens/NutritionEditScreen";
import EmergencyContactEditScreen from "../screens/EmergencyContactEditScreen";
import UserActivityLevelScreen from "../screens/onboarding/UserActivityLevelScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserParticulars"
          component={UserParticularsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMeasurements"
          component={UserMeasurementsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDiabetes"
          component={UserDiabetesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserActivityLevel"
          component={UserActivityLevelScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserGlucoseLevels"
          component={UserGlucoseLevelsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NutritionalDetailsChart"
          component={NutritionalDetailsChartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BloodGlucoseChart"
          component={BloodGlucoseChartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodDiary"
          component={FoodDiaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewFoodEntry"
          component={NewFoodEntryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodEntrySummary"
          component={FoodEntrySummaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BloodGlucoseRecords"
          component={BloodGlucoseRecordsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewBloodGlucoseRecord"
          component={NewBloodGlucoseRecordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Analysis"
          component={AnalysisScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medication"
          component={MedicationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddMedication"
          component={AddMedicationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthcareProvider"
          component={HealthcareProviderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={ProfileEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditNutrition"
          component={NutritionEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditGlucose"
          component={GlucoseEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmergencyContacts"
          component={EmergencyContactEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Common"
          component={CommonLayout}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
