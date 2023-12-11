import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import ClickableText from "../../components/touchable/clickableText";
import InputBox from "../../components/inputBox";
import { FontAwesome5 } from "@expo/vector-icons";

// const food = {
//   name: String,
//   servingSize: Number,
//   calories_kcal: Number,
//   carbs_grams: Number,
//   fat_grams: Number,
//   protein_grams: Number,
//   fibre: Number,
// };

const FoodEntrySummaryScreen = ({ foodDetails, navigation }) => {
  const foodName = "Fried Kway Teow";
  const numberOfServings = 1.5;

  const calories = 200;
  const carbs = 10;
  const fat = 8;
  const protein = 20;
  const fibre = 2;

  const calculatedCalories = calories * numberOfServings;
  const calculatedCarbs = carbs * numberOfServings;
  const calculatedFat = fat * numberOfServings;
  const calculatedProtein = protein * numberOfServings;
  const calculatedFibre = fibre * numberOfServings;

  return (
    <CommonLayout>
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <ClickableText text="Summary" fontSize={30} maybeFontWeight={600} />
        </View>
        <View style={styles.componentsContainer}>
          <View style={styles.componentContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.foodNameText}>{foodName}</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.componentContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.servingText}>Serving Size (g)</Text>
                <InputBox
                  placeholder=""
                  secureTextEntry={false}
                  width="20%"
                  maybeHeight={28}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.servingText}>Number of Servings</Text>
                <InputBox
                  placeholder=""
                  secureTextEntry={false}
                  width="20%"
                  maybeHeight={28}
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
                <TouchableOpacity style={styles.rowContainer}>
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
