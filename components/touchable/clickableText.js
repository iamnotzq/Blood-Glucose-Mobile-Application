import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const ClickableText = ({ text, fontSize, maybeFontWeight }) => {
  const fontWeight = maybeFontWeight ? maybeFontWeight : "400";

  return (
    <TouchableOpacity>
      <Text
        style={{
          color: "#3B83D1",
          fontSize: fontSize,
          fontWeight: fontWeight,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ClickableText;

const styles = StyleSheet.create({});
