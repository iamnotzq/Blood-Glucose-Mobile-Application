import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#F8F9FB",
      }}
    >
      <Text style={styles.title}>NUTRIWISE</Text>

      <View style={styles.primaryContainer}>
        <View>
          <Text style={styles.loginText}>Log In,</Text>
          <Text style={styles.embraceText}>embrace wellness</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              placeholder="johndoe@email.com"
              placeholderTextColor="#9CC0E8"
              style={styles.inputBox}
            />
          </View>

          <View>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              placeholder="••••••••••"
              placeholderTextColor="#9CC0E8"
              style={styles.inputBox}
            />
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <View style={styles.loginButtonContainer}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAnAccountText}>
            Don't have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    marginTop: 32,
    color: "#3B83D1",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "800",
  },
  primaryContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 48,
    justifyContent: "center",
    alignContent: "center",
  },
  loginText: {
    color: "#3B83D1",
    fontSize: 36,
    fontWeight: "700",
  },
  embraceText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: 48,
  },
  inputText: {
    marginTop: 8,
    color: "#3B83D1",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  inputBox: {
    marginTop: 10,
    height: 48,
    width: "100%",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#3B83D1",
    backgroundColor: "F8F9FB",
    paddingHorizontal: 16,
  },
  forgotPasswordContainer: {
    marginTop: 4,
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: "#3B83D1",
    fontSize: 12,
    fontWeight: "400",
  },
  loginButtonContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 96,
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
  signUpContainer: {
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  dontHaveAnAccountText: {
    color: "#3B83D1",
    fontSize: 16,
    fontWeight: "500",
  },
  signUpText: {
    color: "#205188",
    fontSize: 16,
    fontWeight: "800",
  },
});
