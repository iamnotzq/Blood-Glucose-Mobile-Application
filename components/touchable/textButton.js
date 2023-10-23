import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const TextButton = ({
  text,
  maybeButtonHeight,
  maybeFontSize,
  maybeFontWeight,
  maybeBackgroundColor,
  maybeTextColor,
  maybeBorderColor,
  hasShadow,
}) => {
  const buttonHeight = maybeButtonHeight ? maybeButtonHeight : 48;
  const fontSize = maybeFontSize ? maybeFontSize : 20;
  const fontWeight = maybeFontWeight ? maybeFontWeight : "800";
  const backgroundColor = maybeBackgroundColor
    ? maybeBackgroundColor
    : "#3B83D1";
  const textColor = maybeTextColor ? maybeTextColor : "#F8F9FB";
  const borderColor = maybeBorderColor ? maybeBorderColor : "#3B83D1";
  return (
    <TouchableOpacity>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          height: buttonHeight,
          width: "100%",
          backgroundColor: backgroundColor,
          borderWidth: 3,
          borderColor: borderColor,
          borderRadius: 16,
          shadowColor: "black",
          shadowOffset: {
            height: 3,
            width: 0,
          },
          shadowOpacity: 0.3,
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  loginButtonContainer: {
    alignContent: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  loginButtonText: {
    color: "#F8F9FB",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});
