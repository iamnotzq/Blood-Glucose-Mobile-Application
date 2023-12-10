import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";
import React from "react";

const InputBox = ({
  placeholder,
  width,
  secureTextEntry,
  maybeOnChangeText,
  maybeValue,
  maybeMarginBottom,
  maybeOnSubmitEditing,
}) => {
  const onChangeText = maybeOnChangeText || (() => {});
  const onSubmitEditing = maybeOnSubmitEditing || (() => {});
  const value = maybeValue || "";
  const marginBottom = maybeMarginBottom || 12;

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CC0E8"
        style={{
          height: 48,
          width: width,
          borderRadius: 16,
          borderWidth: 3,
          borderColor: "#3B83D1",
          backgroundColor: "#F8F9FB",
          paddingHorizontal: 16,
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
