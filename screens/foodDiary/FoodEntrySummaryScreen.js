import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import InputBox from "../../components/inputBox";
import { FontAwesome5 } from "@expo/vector-icons";

const FoodEntrySummaryScreen = ({ foodDetails, navigation, route }) => {
  const { id } = route.params;
  const [servingSize, setServingSize] = useState("");

  const foodName = "Fried Kway Teow";

  const calories = 200;
  const carbs = 10;
  const fat = 8;
  const protein = 20;
  const fibre = 2;

  const calculatedCalories = calories * servingSize || 0;
  const calculatedCarbs = carbs * servingSize || 0;
  const calculatedFat = fat * servingSize || 0;
  const calculatedProtein = protein * servingSize || 0;
  const calculatedFibre = fibre * servingSize || 0;

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer} key="food-entry-summary">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text style={styles.mainHeaderText}>Summary</Text>
        </View>
        <View style={styles.componentsContainer}>
          <View style={styles.componentContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.foodNameText}>{foodName}</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.componentContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.servingText}>Serving Size</Text>
                <InputBox
                  placeholder=""
                  secureTextEntry={false}
                  width="20%"
                  maybeHeight={28}
                  maybeOnChangeText={(text) => setServingSize(text)}
                  maybeValue={servingSize}
                />
              </View>
            </View>
          </View>

          <View style={styles.componentContainer}>
            <View style={styles.foodDetailsContainer}>
              <Text style={styles.foodDetailsHeader}>Nutritional Details</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.foodDetailsText}>Calories</Text>
                <Text style={styles.foodDetailsText}>
                  {calculatedCalories} kcal
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.foodDetailsText}>Carbs</Text>
                <Text style={styles.foodDetailsText}>{calculatedCarbs} g</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.foodDetailsText}>Fat</Text>
                <Text style={styles.foodDetailsText}>{calculatedFat} g</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.foodDetailsText}>Protein</Text>
                <Text style={styles.foodDetailsText}>
                  {calculatedProtein} g
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.foodDetailsText}>Fibre</Text>
                <Text style={styles.foodDetailsText}>{calculatedFibre} g</Text>
              </View>
              <View style={{ marginTop: 5, paddingHorizontal: 32 }}>
                <TouchableOpacity
                  style={styles.rowContainer}
                  onPress={() => navigation.navigate("Dashboard", { id: id })}
                >
                  <View></View>
                  <FontAwesome5 name="check-circle" size={40} color="#3DD17B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default FoodEntrySummaryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#3B83D1",
    margin: 16,
    opacity: 0.7,
  },
  componentsContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  componentContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  foodNameText: {
    color: "#3B83D1",
    fontSize: 22,
    fontWeight: "600",
  },
  servingText: {
    color: "#3B83D1",
    fontSize: 22,
    fontWeight: "400",
  },
  foodDetailsContainer: {
    width: "100%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  foodDetailsHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  foodDetailsText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "400",
    marginHorizontal: 32,
  },
});
