import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";
import React from "react";

const InputBox = ({ placeholder }) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CC0E8"
        style={styles.textInput}
      />
    </KeyboardAvoidingView>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    width: "100%",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#3B83D1",
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
