import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const TextButton = ({
  text,
  maybeButtonHeight,
  maybeFontSize,
  maybeFontWeight,
}) => {
  const buttonHeight = maybeButtonHeight ? maybeButtonHeight : 48;
  const fontSize = maybeFontSize ? maybeFontSize : 20;
  const fontWeight = maybeFontWeight ? maybeFontWeight : "800";
  return (
    <TouchableOpacity>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          height: buttonHeight,
          width: "100%",
          backgroundColor: "#3B83D1",
          borderRadius: 16,
          shadowColor: "black",
          shadowOffset: {
            height: 4,
            width: 0,
          },
          shadowOpacity: 0.3,
        }}
      >
        <Text
          style={{
            color: "#F8F9FB",
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
