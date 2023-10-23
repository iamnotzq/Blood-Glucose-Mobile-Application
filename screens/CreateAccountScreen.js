import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBox from "../components/inputBox";
import ClickableText from "../components/touchable/clickableText";
import TextButton from "../components/touchable/textButton";

const CreateAccountScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.boldHeader}>Create an Account,</Text>
          <Text style={styles.regularHeader}>start your journey</Text>
        </View>

        <View style={styles.inputContainer}>
          <InputBox placeholder="Username" width="100%" />
          <InputBox placeholder="Email" width="100%" />
          <InputBox placeholder="Password" width="100%" />
          <InputBox placeholder="Confirm Password" width="100%" />
        </View>

        <View style={{ flex: 1 }}></View>

        <View>
          <TextButton text="Create Account" />
          <View style={styles.smallTextContainer}>
            <Text style={styles.smallText}>Already have an account?</Text>
            <Text> </Text>
            <ClickableText text="Log In" fontSize={16} maybeFontWeight="800" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F8F9FB",
  },
  appText: {
    marginTop: 32,
    color: "#3B83D1",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "800",
  },
  componentsContainer: {
    paddingHorizontal: 48,
    justifyContent: "space-between",
    alignContent: "center",
    flexGrow: 1,
  },
  headerTextContainer: {
    marginTop: 90,
  },
  boldHeader: {
    color: "#3B83D1",
    fontSize: 36,
    fontWeight: "700",
  },
  regularHeader: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: 48,
  },
  smallTextContainer: {
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  smallText: {
    color: "#3B83D1",
    fontSize: 16,
    fontWeight: "500",
  },
});
