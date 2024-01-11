import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";
import { updateMedicationDetails, getMedicationList } from "../hooks/apiHooks";

const MedicationContainer = ({
  medicationName,
  consumptionPeriod,
  dosage,
  navigation,
  id,
}) => {
  const [hoursMins, period] = consumptionPeriod.split(" ");
  const [hours, minutes] = hoursMins.split(":");

  const [isMedicationLogged, setMedicationLogged] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedMedicationName, setEditedMedicationName] =
    useState(medicationName);
  const [editedDosage, setEditedDosage] = useState(dosage);
  const [editedHours, setEditedHours] = useState(hours);
  const [editedMinutes, setEditedMinutes] = useState(minutes);
  const [selectedButton, setSelectedButton] = useState(period);

  const handleCheckCirclePress = () => {
    setMedicationLogged(true);
  };

  const handleUndoPress = () => {
    setMedicationLogged(false);
  };

  const handleEditPress = () => {
    setModalVisible(true);
  };

  const handleSaveChanges = async () => {
    const isValidHour = /^[1-9]|1[0-2]$/.test(editedHours);
    const isValidMinute = /^[0-5]?[0-9]$/.test(editedMinutes);

    if (!isValidHour) {
      Alert.alert("Only numbers between 1 - 12 are allowed");
      return;
    } else if (!isValidMinute) {
      Alert.alert("Only numbers between 0 and 59 are allowed");
      return;
    }

    const formattedHours =
      editedHours < 10 ? `0${editedHours}` : `${editedHours}`;
    const formattedMinutes =
      editedMinutes.length === 1 ? `0${editedMinutes}` : `${editedMinutes}`;
    const timeString = `${formattedHours}:${formattedMinutes} ${selectedButton}`;

    const medicationDetails = {
      originalMedicationName: medicationName,
      editedMedicationName: editedMedicationName,
      editedDosage: editedDosage,
      editedTime: timeString,
    };

    await updateMedicationDetails(id, medicationDetails, navigation);

    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <MaterialCommunityIcons name="pill" size={50} color="#3B83D1" />

      <View style={{ width: "50%" }}>
        <Text style={styles.medication}>{medicationName}</Text>
        <Text style={styles.period}>{dosage} mg</Text>
        <Text style={styles.period}>{consumptionPeriod}</Text>
      </View>

      <View style={styles.lastColumnContainer}>
        <TouchableOpacity onPress={handleEditPress}>
          <EvilIcons name="pencil" size={30} color="#3B83D1" />
        </TouchableOpacity>

        {!isMedicationLogged && (
          <TouchableOpacity onPress={handleCheckCirclePress}>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color="#29af61"
            />
          </TouchableOpacity>
        )}

        {isMedicationLogged && (
          <TouchableOpacity onPress={handleUndoPress}>
            <Ionicons
              name="ios-arrow-undo-circle-outline"
              size={30}
              color="#3B83D1"
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.mainHeaderText}>Edit Medication</Text>

          <TextInput
            style={styles.input}
            placeholder="Medication Name"
            value={editedMedicationName}
            placeholderTextColor="#3B83D1"
            selectionColor="#3B83D1"
            cursorColor="#3B83D1"
            onChangeText={(text) => setEditedMedicationName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Dosage Level"
            value={editedDosage}
            placeholderTextColor="#3B83D1"
            selectionColor="#3B83D1"
            cursorColor="#3B83D1"
            onChangeText={(text) => setEditedDosage(text)}
          />

          <View style={styles.row}>
            <View style={styles.rowInputContainer}>
              <TextInput
                style={styles.rowInput}
                placeholder="Hour"
                value={editedHours}
                onChangeText={(text) => setEditedHours(text)}
              />

              <TextInput
                style={styles.rowInput}
                placeholder="Min"
                value={editedMinutes}
                onChangeText={(text) => setEditedMinutes(text)}
              />
            </View>

            <View style={styles.rowInputContainer}>
              <TouchableOpacity
                style={
                  selectedButton === "AM"
                    ? styles.selectedButtonStyle
                    : styles.unselectedButtonStyle
                }
                onPress={() => {
                  setSelectedButton("AM");
                }}
              >
                <Text
                  style={
                    selectedButton === "AM"
                      ? styles.selectedTextStyle
                      : styles.unselectedTextStyle
                  }
                >
                  AM
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  selectedButton === "PM"
                    ? styles.selectedButtonStyle
                    : styles.unselectedButtonStyle
                }
                onPress={() => {
                  setSelectedButton("PM");
                }}
              >
                <Text
                  style={
                    selectedButton === "PM"
                      ? styles.selectedTextStyle
                      : styles.unselectedTextStyle
                  }
                >
                  PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleSaveChanges}>
            <Text style={styles.period}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MedicationContainer;

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    width: "90%",
    backgroundColor: "#c4daf1",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  medication: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3B83D1",
  },
  period: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3B83D1",
  },
  lastColumnContainer: {
    paddingVertical: 5,
    height: "100%",
    justifyContent: "space-between",
    alignContent: "center",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  modalContainer: {
    flex: 1,
    height: "250",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "#3B83D1",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 3,
    margin: 10,
    padding: 10,
    width: "80%",
    fontSize: 20,
    color: "#3B83D1",
    fontWeight: "500",
  },
  rowInput: {
    height: 50,
    borderColor: "#3B83D1",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 3,
    margin: 10,
    padding: 10,
    width: "45%",
    fontSize: 20,
    color: "#3B83D1",
    fontWeight: "500",
  },
  rowInputContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  selectedButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B83D1",
    width: "40%",
    height: 36,
    borderRadius: 48,
  },
  selectedTextStyle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  unselectedButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "40%",
    height: 36,
    borderColor: "#3B83D1",
    borderWidth: 3,
    borderRadius: 48,
  },
  unselectedTextStyle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#3B83D1",
    textAlign: "center",
  },
});
