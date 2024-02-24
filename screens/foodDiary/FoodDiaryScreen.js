import CommonLayout from "../CommonLayout";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { displayFoodTip } from "../../hooks/commonHooks";
import { renderFoodEntrySection } from "../../hooks/foodDiaryHooks";

const FoodDiaryScreen = ({ navigation, route }) => {
  const { id, previousGlucoseLevel } = route.params;
  const foodEntries = [
    // {
    //   foodName: "Chicken",
    //   timeConsumed: "10:30 PM",
    //   fat: 31,
    //   carbs: 66,
    //   protein: 32,
    //   calories: 200,
    // },
    // {
    //   foodName: "Chicken",
    //   timeConsumed: "10:30 PM",
    //   fat: 31,
    //   carbs: 66,
    //   protein: 32,
    //   calories: 200,
    // },
  ];

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainHeaderContainer}>
          <Text style={styles.mainHeaderText}>Food Diary</Text>
          <View></View>
        </View>

        <Text style={styles.foodTip}>"{displayFoodTip(foodEntries)}"</Text>

        <View style={styles.container}>
          {renderFoodEntrySection(foodEntries)}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.foodEntrybutton}
            onPress={() =>
              navigation.navigate("NewFoodEntry", {
                id: id,
              })
            }
          >
            <FontAwesome name="pencil-square-o" size={60} color="#ffffff" />
            <Text style={styles.buttonText}>New</Text>
            <Text style={styles.buttonText}>Entry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.foodEntrybutton}>
            <Ionicons name="ios-barcode-outline" size={60} color="#ffffff" />
            <Text style={styles.buttonText}>Scan</Text>
            <Text style={styles.buttonText}>Barcode</Text>
          </TouchableOpacity>
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default FoodDiaryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  mainHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  container: {
    height: "60%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  foodEntryContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
    borderColor: "#3B83D1",
    borderWidth: 3,
    borderRadius: 16,
    padding: 16,
    flexGrow: 1,
  },
  foodEntryContentContainer: {
    flexGrow: 1,
    height: "100%",
  },
  foodEntrybutton: {
    height: 120,
    width: 120,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B83D1",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  textBoxContainer: {
    width: "100%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  textBoxText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  textBoxSubText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  foodEntryComponent: {
    width: "100%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  foodEntryComponentHeader: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },
  foodEntryComponentSubHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },
  foodEntryComponentDivider: {
    width: "100%",
    height: 2,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    margin: 16,
  },
  foodEntryComponentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  nutritionContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  nutritionHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.8,
  },
  nutritionText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "400",
  },
  foodTip: {
    width: "90%",
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
