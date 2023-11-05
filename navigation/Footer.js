import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            size={50}
            color="#3B83D1"
          />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circle}>
          <Feather name="plus" size={40} color="#F8F9FB" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-outline" size={50} color="#3B83D1" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  mainContainer: {
    width: 380,
    height: 75,
    borderRadius: 32,
    backgroundColor: "#F8F9FB",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alightItems: "center",
  },
  iconText: {
    color: "#3B83D1",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: "#3B83D1",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
