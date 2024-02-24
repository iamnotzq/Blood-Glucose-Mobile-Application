import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import InputBox from "../../components/inputBox";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  calculateNutritionalDetails,
  renderBloodGlucosePrediction,
} from "../../hooks/foodDiaryHooks";
import { getDashboardAssets } from "../../hooks/apiHooks";

const FoodEntrySummaryScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const [previousGlucoseLevel, setPreviousGlucoseLevel] = useState(0);
  const [servingSize, setServingSize] = useState(0);
  const [foodDetails, setFoodDetails] = useState(null);
  const foodName = "Fried Kway Teow";

  useEffect(() => {
    const fetchPreviousGlucoseLevel = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/glucose/get-recent-record/${id}`
        );

        const content = await response.json();

        console.log(content);
        setPreviousGlucoseLevel(content);
      } catch (error) {
        console.error(
          "Error fetching previous glucose details:",
          error.message
        );
      }
    };

    fetchPreviousGlucoseLevel();
  }, []);

  useEffect(() => {
    const fetchNutritionalContent = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/food/nutritional-content/Fried%20Kway%20Teow`
        );

        const content = await response.json();

        console.log(content);
        setFoodDetails(content);
      } catch (error) {
        console.error("Error fetching nutritional content:", error.message);
      }
    };

    fetchNutritionalContent();
  }, []);

  const calories = foodDetails?.calories || 0;
  const carbs = foodDetails?.carbohydrates || 0;
  const fat = foodDetails?.fat || 0;
  const sodium = foodDetails?.sodium || 0;
  const fiber = foodDetails?.fiber || 0;

  const {
    calculatedCalories,
    calculatedCarbs,
    calculatedFat,
    calculatedProtein,
    calculatedFibre,
    units,
  } = calculateNutritionalDetails(
    servingSize,
    calories,
    carbs,
    fat,
    sodium,
    fiber
  );

  const timestamp = new Date();
  const hours = timestamp.getHours();
  let mealType;

  if (hours < 12) {
    mealType = "breakfast";
  } else if (hours >= 12 && hours < 19) {
    mealType = "lunch";
  } else {
    mealType = "dinner";
  }

  const handleClick = async () => {
    const reqBody = {
      userId: id,
      foodName: foodName,
      timestamp: timestamp,
      portionSize: servingSize,
      mealType: mealType,
      mealDescription: "",
    };

    try {
      const response = await fetch("http://localhost:8000/api/food/new-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (response.ok) {
        const newId = await response.json();
        console.log(`Glucose entry has been created: ${newId}`);

        navigation.navigate("Dashboard", { id: id });
      } else {
        console.error("Glucose entry creation failed");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const handlePredictionClick = () => {
    navigation.navigate("NewBloodGlucoseRecord", {
      id: id,
      previousGlucoseLevel: previousGlucoseLevel,
    });
  };

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
                  maybeOnChangeText={(text) => setServingSize(parseFloat(text))}
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
                <Text style={styles.foodDetailsText}>Fiber</Text>
                <Text style={styles.foodDetailsText}>{calculatedFibre} g</Text>
              </View>
              <View style={{ marginTop: 5, paddingHorizontal: 32 }}>
                <TouchableOpacity
                  style={styles.rowContainer}
                  onPress={handleClick}
                >
                  <View></View>
                  <FontAwesome5 name="check-circle" size={40} color="#3DD17B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {renderBloodGlucosePrediction(
            previousGlucoseLevel,
            calculatedCarbs,
            calculatedCalories,
            handlePredictionClick
          )}
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
