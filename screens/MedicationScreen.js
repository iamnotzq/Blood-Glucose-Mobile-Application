import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import CommonLayout from "./CommonLayout";
import MedicationContainer from "../components/medicationContainer";
import TextButton from "../components/touchable/textButton";
import { getMedicationList } from "../hooks/apiHooks";

const MedicationScreen = ({ navigation, route }) => {
  const { id } = route.params;

  console.log(`Retrieving medication list for: ${id} ${timestamp}`);
  const { medicationList, loading, error, refresh } = getMedicationList(
    id,
    navigation
  );
  const timestamp = new Date();

  const displayMedicationList = (medicationList) => {
    if (medicationList.length === 0) {
      return (
        <View style={styles.emptyMedicationListContainer}>
          <Text style={styles.emptyMedicationListText}>
            You currently have no medications in your list.
          </Text>

          <Text></Text>

          <Text style={styles.emptyMedicationListText}>
            Please add a new one by clicking the button below.
          </Text>
        </View>
      );
    }

    return medicationList?.map(({ medicationName, dosage, time }) => (
      <MedicationContainer
        key={medicationName}
        medicationName={medicationName}
        consumptionPeriod={time}
        dosage={dosage}
        navigation={navigation}
        id={id}
      />
    ));
  };

  if (loading) {
    return <Text>Loading</Text>;
  }

  console.log(medicationList);

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

          <TouchableOpacity style={styles.pillContainer} onPress={refresh}>
            <Fontisto name="pills" size={80} color="#3B83D1" />
          </TouchableOpacity>
        </View>

        {displayMedicationList(medicationList)}

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
  emptyMedicationListContainer: {
    height: "30%",
    width: "80%",
    backgroundColor: "#ffffff",
    borderColor: "#3B83D1",
    borderWidth: 3,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyMedicationListText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
});
