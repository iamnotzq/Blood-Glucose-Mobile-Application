import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";

const MedicationContainer = ({ medicationName, consumptionPeriod }) => {
  const [isMedicationLogged, setMedicationLogged] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedMedicationName, setEditedMedicationName] =
    useState(medicationName);
  const [editedConsumptionPeriod, setEditedConsumptionPeriod] =
    useState(consumptionPeriod);

  const handleCheckCirclePress = () => {
    setMedicationLogged(true);
  };

  const handleUndoPress = () => {
    setMedicationLogged(false);
  };

  const handleEditPress = () => {
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    // Save the changes and close the modal
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <MaterialCommunityIcons name="pill" size={50} color="#3B83D1" />

      <View style={{ width: "50%" }}>
        <Text style={styles.medication}>{editedMedicationName}</Text>
        <Text style={styles.period}>
          {isMedicationLogged ? "Logged" : editedConsumptionPeriod}
        </Text>
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

      {/* Edit Medication Modal */}
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
            placeholder="Consumption Period"
            value={editedConsumptionPeriod}
            onChangeText={(text) => setEditedConsumptionPeriod(text)}
          />

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
    height: 80,
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
    fontWeight: "800",
    color: "#3B83D1",
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
});
