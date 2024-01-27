import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CommonLayout from "./CommonLayout";
import Header from "../navigation/Header";
import { useNutritionalDetailsChartData } from "../hooks/foodDiaryHooks";

const Legend = () => {
  return (
    <View style={styles.legendContainer}>
      <View style={styles.legendComponent}>
        <View
          style={[styles.legendSquare, { backgroundColor: "#D13D3D" }]}
        ></View>
        <Text style={styles.legendText}>Fat</Text>
      </View>

      <View style={styles.legendComponent}>
        <View
          style={[styles.legendSquare, { backgroundColor: "#3DD17B" }]}
        ></View>
        <Text style={styles.legendText}>Protein</Text>
      </View>

      <View style={styles.legendComponent}>
        <View
          style={[styles.legendSquare, { backgroundColor: "#3B83D1" }]}
        ></View>
        <Text style={styles.legendText}>Carbs</Text>
      </View>
    </View>
  );
};

const NutritionalDetailsChartScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const headers = ["Day", "Week", "Month"];
  const initialData = {
    dayData: [
      { value: 40, color: "#3B83D1" },
      { value: 30, color: "#3DD17B" },
      { value: 30, color: "#D13D3D" },
    ],
    weekData: [
      { value: 50, color: "#3B83D1" },
      { value: 30, color: "#3DD17B" },
      { value: 20, color: "#D13D3D" },
    ],
    monthData: [
      { value: 28, color: "#3B83D1" },
      { value: 32, color: "#3DD17B" },
      { value: 40, color: "#D13D3D" },
    ],
  };
  const { selectedPeriod, handleHeaderPress, getChartData } =
    useNutritionalDetailsChartData(initialData);

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <Header handleHeaderPress={handleHeaderPress} headers={headers} />

        <View style={styles.pieChartContainer}>
          <PieChart
            data={getChartData()}
            radius={150}
            donut
            showText
            showValuesAsLabels
            textBackgroundRadius={22}
            textColor="white"
            textSize={16}
            fontWeight="bold"
            strokeColor="#333"
          />

          <Legend />
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default NutritionalDetailsChartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  pieChartContainer: {
    width: "90%",
    height: "50%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legendSquare: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#000000",
  },
  legendComponent: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  legendText: {
    fontSize: 18,
    color: "#3B83D1",
    fontWeight: "800",
    marginTop: 4,
  },
});
