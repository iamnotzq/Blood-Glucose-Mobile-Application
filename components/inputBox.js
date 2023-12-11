import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";
import React from "react";

const InputBox = ({
  placeholder,
  width,
  secureTextEntry,
  maybeHeight,
  maybeOnChangeText,
  maybeValue,
  maybeMarginBottom,
  maybeOnSubmitEditing,
  maybePaddingHorizontal,
}) => {
  const onChangeText = maybeOnChangeText || (() => {});
  const onSubmitEditing = maybeOnSubmitEditing || (() => {});
  const value = maybeValue || "";
  const marginBottom = maybeMarginBottom || 12;
  const height = maybeHeight || 48;
  const paddingHorizontal = maybePaddingHorizontal || 16;

  return (
    <KeyboardAvoidingView
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CC0E8"
        style={{
          height: height,
          width: "100%",
          borderRadius: 16,
          borderWidth: 3,
          borderColor: "#3B83D1",
          backgroundColor: "#F8F9FB",
          paddingHorizontal: paddingHorizontal,
          marginBottom: marginBottom,
        }}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
      />
    </KeyboardAvoidingView>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
