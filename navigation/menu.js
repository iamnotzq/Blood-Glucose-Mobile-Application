import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import React from "react";

const Menu = ({ isVisible, onClose, navigation, id }) => {
  const navigateAndClose = (screenName) => {
    navigation.navigate(screenName, { id: id });
    onClose();
  };
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View></View>
          <Entypo name="cross" size={24} color="#F8F9FB" />
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateAndClose("Profile")}
          >
            <Ionicons name="person-outline" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateAndClose("Medication")}
          >
            <MaterialCommunityIcons name="pill" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Medication</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateAndClose("FoodDiary")}
          >
            <MaterialCommunityIcons
              name="notebook-edit-outline"
              size={80}
              color="#3B83D1"
            />
            <Text style={styles.iconText}>Food Diary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateAndClose("BloodGlucoseRecords")}
          >
            <Fontisto name="injection-syringe" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Glucose</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigateAndClose("Analysis")}
          >
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={80}
              color="#3B83D1"
            />
            <Text style={styles.iconText}>Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Ionicons name="md-settings-outline" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menu: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
    backgroundColor: "#9CC0E8",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    zIndex: 9999,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  box: {
    width: 150,
    height: 150,
    borderRadius: 16,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    margin: 16,
  },
  iconText: {
    color: "#3B83D1",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    margin: 10,
  },
});
