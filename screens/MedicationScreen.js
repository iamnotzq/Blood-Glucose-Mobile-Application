import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import CommonLayout from "./CommonLayout";
import MedicationContainer from "../components/medicationContainer";
import TextButton from "../components/touchable/textButton";

const MedicationScreen = ({ navigation, route }) => {
  const { id } = route.params;

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.mainHeaderRow}>
            <Text style={styles.mainHeaderText}>Medication List</Text>
          </View>

          <View style={{ marginVertical: 10 }}></View>

          <View style={styles.pillContainer}>
            <Fontisto name="pills" size={80} color="#3B83D1" />
          </View>
        </View>

        <MedicationContainer
          medicationName="Sulfonylurea"
          consumptionPeriod="Before Breakfast"
        />

        <MedicationContainer
          medicationName="Meglitinides"
          consumptionPeriod="Before Lunch"
        />

        <MedicationContainer
          medicationName="Insulin"
          consumptionPeriod="Before Diner"
        />

        <MedicationContainer
          medicationName="Metformin"
          consumptionPeriod="After Diner"
        />

        <TextButton
          text="Add Medication"
          maybeFontSize={24}
          maybeFontWeight="600"
          maybeButtonWidth={220}
          onPress={() => {
            navigation.navigate("AddMedication", { id: id });
          }}
        />

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default MedicationScreen;

const styles = StyleSheet.create({
  mainHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E8EBF2",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  pillContainer: {
    height: 150,
    width: 150,
    borderRadius: 150,
    backgroundColor: "#c4daf1",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3B83D1",
    borderWidth: 4,
  },
});
