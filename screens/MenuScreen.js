import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import React from "react";
import Footer from "../navigation/Footer";

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View></View>

      <View style={styles.menu}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.box}>
            <Ionicons name="person-outline" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <MaterialCommunityIcons name="pill" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Medication</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.box}>
            <MaterialCommunityIcons
              name="notebook-edit-outline"
              size={80}
              color="#3B83D1"
            />
            <Text style={styles.iconText}>Food Diary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Fontisto name="injection-syringe" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Glucose</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.box}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={80}
              color="#3B83D1"
            />
            <Text style={styles.iconText}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
            <Ionicons name="md-settings-outline" size={80} color="#3B83D1" />
            <Text style={styles.iconText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E8EBF2",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  menu: {
    borderRadius: 16,
    width: 375,
    height: 560,
    backgroundColor: "#9CC0E8",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
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
