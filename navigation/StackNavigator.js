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
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
