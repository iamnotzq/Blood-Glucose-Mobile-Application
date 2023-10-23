import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const RightArrowButton = ({ size, onPress, width }) => {
  return (
    <TouchableOpacity
      style={{
        height: "auto",
        width: width,
        borderRadius: 16,
        backgroundColor: "#3B83D1",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <AntDesign name="arrowright" size={size} color="#F8F9FB" />
    </TouchableOpacity>
  );
};

export default RightArrowButton;

const styles = StyleSheet.create({});
