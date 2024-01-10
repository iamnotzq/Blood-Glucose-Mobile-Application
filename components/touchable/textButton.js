import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const TextButton = ({
  text,
  onPress,
  maybeButtonHeight,
  maybeButtonWidth,
  maybeFontSize,
  maybeFontWeight,
  maybeBackgroundColor,
  maybeTextColor,
  maybeBorderColor,
  maybeShadowOpacity,
  maybeBorderRadius,
  maybeShadowColor,
}) => {
  const buttonHeight = maybeButtonHeight ? maybeButtonHeight : 48;
  const fontSize = maybeFontSize ? maybeFontSize : 20;
  const fontWeight = maybeFontWeight ? maybeFontWeight : "800";
  const backgroundColor = maybeBackgroundColor
    ? maybeBackgroundColor
    : "#3B83D1";
  const textColor = maybeTextColor ? maybeTextColor : "#F8F9FB";
  const borderColor = maybeBorderColor ? maybeBorderColor : "#3B83D1";
  const buttonWidth = maybeButtonWidth ? maybeButtonWidth : "100%";
  const shadowOpacity = maybeShadowOpacity ? maybeShadowOpacity : 0.3;
  const borderRadius = maybeBorderRadius ? maybeBorderRadius : 16;
  const shadowColor = maybeShadowColor ? maybeShadowColor : "black";

  return (
    <TouchableOpacity style={{ width: buttonWidth }} onPress={onPress}>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          height: buttonHeight,
          width: "100%",
          backgroundColor: backgroundColor,
          borderWidth: 3,
          borderColor: borderColor,
          borderRadius: borderRadius,
          shadowColor: shadowColor,
          shadowOffset: {
            height: 3,
            width: 0,
          },
          shadowOpacity: shadowOpacity,
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
