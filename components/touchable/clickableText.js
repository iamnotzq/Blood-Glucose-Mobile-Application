import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const ClickableText = ({
  text,
  onPress,
  fontSize,
  maybeFontWeight,
  maybeTextColor,
}) => {
  const fontWeight = maybeFontWeight ? maybeFontWeight : "400";
  const color = maybeTextColor ? maybeTextColor : "#3B83D1";

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: color,
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
