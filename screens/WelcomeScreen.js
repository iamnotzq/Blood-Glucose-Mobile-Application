import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const WelcomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#3B83D1",
      }}
    >
      <View style={styles.primaryContainer}>
        <Text style={styles.title}>NUTRIWISE</Text>
        <Text style={styles.subHeading}>
          Your Food Diary and Health Partner
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={styles.letsGetStartedButton}>
              <Text style={styles.letsGetStartedButtonText}>
                Let's Get Started
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountTextContainer}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  primaryContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 48,
  },
  title: {
    color: "#F8F9FB",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "800",
  },
  subHeading: {
    color: "#F8F9FB",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  buttonContainer: {
    top: 240,
  },
  letsGetStartedButton: {
    height: 48,
    width: "100%",
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  letsGetStartedButtonText: {
    color: "#3B83D1",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
  },
  createAccountText: {
    color: "#F8F9FB",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  createAccountTextContainer: {
    marginTop: 24,
  },
});
