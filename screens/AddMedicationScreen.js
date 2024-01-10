import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Alert } from "react-native";
import CommonLayout from "./CommonLayout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextButton from "../components/touchable/textButton";
import InputBox from "../components/inputBox";
import DropDownPicker from "react-native-dropdown-picker";
import { updateMedicationList } from "../hooks/apiHooks";

const AddMedicationScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const [timeOpen, setTimeOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(null);
  const [medicationName, setMedicationName] = useState("");
  const [dosageLevel, setDosageLevel] = useState("");

  const generateTimeOptions = () => {
    const options = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 0 && minute === 0) {
          continue;
        }
        if (hour === 12 && minute === 0) {
          continue;
        }

        const formattedHour = (hour % 12 || 12).toString();
        const formattedMinute = minute.toString().padStart(2, "0");
        const period = hour < 12 ? "AM" : "PM";
        const label = `${formattedHour}:${formattedMinute} ${period}`;
        const value = `${formattedHour}:${formattedMinute} ${period}`;
        options.push({ label, value });
      }
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleConfirmClick = async () => {
    const medicationData = {
      medicationName: medicationName,
      dosageLevel: dosageLevel,
      timeValue: timeValue,
    };
    updateMedicationList(id, medicationData, navigation);
  };

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
          <View style={styles.row}>
            <Text style={styles.mainHeaderText}>Add Medication</Text>
            <View></View>
          </View>

          <View style={{ margin: 10 }}></View>

          <View style={styles.cirlceBackground}>
            <MaterialCommunityIcons name="pill" size={80} color="#3B83D1" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.textBoxRow}>
            <Text style={styles.textBoxHeader}>Medication Name</Text>
            <InputBox
              placeholder="Input the medication name"
              width="100%"
              maybeOnChangeText={(text) => setMedicationName(text)}
              maybeValue={medicationName}
            />
          </View>

          <View style={styles.textBoxRow}>
            <Text style={styles.textBoxHeader}>Dosage Level</Text>
            <InputBox
              placeholder="Input your dosage levels in mg"
              width="100%"
              maybeOnChangeText={(text) => setDosageLevel(text)}
              maybeValue={dosageLevel}
            />
          </View>

          <View style={styles.textBoxRow}>
            <Text style={styles.textBoxHeader}>Time</Text>
            <DropDownPicker
              open={timeOpen}
              value={timeValue}
              items={timeOptions}
              setOpen={setTimeOpen}
              setValue={setTimeValue}
              placeholder="--"
              maxHeight={100}
              textStyle={styles.dropDownText}
              style={styles.dropDownBoxContainer}
              dropDownContainerStyle={styles.dropDownBox}
            />
          </View>

          <View></View>
        </View>

        <View></View>

        <TextButton
          maybeButtonWidth={100}
          text="Confirm"
          onPress={handleConfirmClick}
        />

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default AddMedicationScreen;

const styles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cirlceBackground: {
    height: 150,
    width: 150,
    borderRadius: 150,
    backgroundColor: "#c4d9f1",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3B83D1",
    borderWidth: 4,
  },
  subHeadingText: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "600",
    zIndex: 0,
  },
  inputContainer: {
    height: "50%",
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 0,
  },
  textBoxHeader: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    marginLeft: 4,
  },
  textBoxRow: {
    width: "90%",
    justifyContent: "center",
  },
  dropDownText: {
    color: "#3B83D1",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  dropDownBox: {
    borderColor: "#3B83D1",
    borderRadius: 16,
    borderTopWidth: 0,
    borderWidth: 3,
    width: "100%",
    backgroundColor: "#F8F9FB",
  },
  dropDownBoxContainer: {
    borderColor: "#3B83D1",
    borderRadius: 16,
    borderWidth: 3,
    width: "100%",
    height: 48,
    backgroundColor: "#F8F9FB",
  },
});
