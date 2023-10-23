import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const TextButton = ({ text, fontSize }) => {
  return (
    <TouchableOpacity>
      <Text
        style={{
          color: "#3B83D1",
          fontSize: fontSize,
          fontWeight: "400",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
