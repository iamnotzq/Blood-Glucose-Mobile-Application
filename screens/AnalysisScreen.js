import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CommonLayout from "./CommonLayout";
import AnalysisContainer from "../components/analysisContainer";

const AnalysisScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const caloricGoal = 2000;
  const caloricProgessText =
    "Your goal of staying within " +
    caloricGoal +
    " kcal has been good so far, keep it up";
  const dietText =
    "Your diet recently has been high in saturated fats and low in fiber which may haved been contributing to your high blood glucose levels";
  const bloodGlucoseText =
    "Blood glucose readings in the morning have be higher than normal";

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainHeaderContainer}>
          <Text style={styles.mainHeaderText}>Analysis</Text>
        </View>

        <AnalysisContainer
          header="Caloric Progress"
          text={caloricProgessText}
        />
        <AnalysisContainer header="Blood Glucose" text={bloodGlucoseText} />
        <AnalysisContainer header="Diet" text={dietText} />
        {/* <AnalysisContainer header="Diet" text={text} /> */}

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default AnalysisScreen;

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
});
