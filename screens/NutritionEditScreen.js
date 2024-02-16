import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CommonLayout from "./CommonLayout";
import { commonStyles } from "../styles/commonStyles";
import InputBox from "../components/inputBox";
import TextButton from "../components/touchable/textButton";

const NutritionEditScreen = ({ navigation, route }) => {
  const nutritionalDetails = {
    calorieGoalKcal: 2000,
    proteinPct: 40,
    fatPct: 30,
    carbsPct: 30,
  };

  const handleClick = () => {};

  return (
    <CommonLayout>
      <SafeAreaView style={commonStyles.mainContainer}>
        <View style={commonStyles.mainHeaderContainer}>
          <Text style={commonStyles.mainHeaderText}>
            Edit Nutritional Details
          </Text>
        </View>
        <View style={styles.mainComponent}>
          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Calorie Goal</Text>

            <InputBox
              placeholder={nutritionalDetails.calorieGoalKcal.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Fat (%)</Text>

            <InputBox
              placeholder={nutritionalDetails.fatPct.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Carbs (%)</Text>

            <InputBox
              placeholder={nutritionalDetails.carbsPct.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Protein (%)</Text>

            <InputBox
              placeholder={nutritionalDetails.proteinPct.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <TextButton
            text="Confirm"
            maybeButtonWidth="95%"
            onPress={handleClick}
          />
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default NutritionEditScreen;

export const styles = StyleSheet.create({
  mainComponent: {
    height: "65%",
    width: "90%",
    padding: 16,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "#3B83D1",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  componentRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  inputHeader: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "600",
  },
});
