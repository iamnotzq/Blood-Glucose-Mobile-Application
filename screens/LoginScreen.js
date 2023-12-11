import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ClickableText from "../components/touchable/clickableText";
import TextButton from "../components/touchable/textButton";
import InputBox from "../components/inputBox";

const LoginScreen = ({ navigation }) => {
  const handleWelcomeButtonPress = () => {
    navigation.navigate("Welcome");
  };
  const handleSignUpButtonPress = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText} onPress={handleWelcomeButtonPress}>
        NUTRIWISE
      </Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.boldHeader}>Log In,</Text>
          <Text style={styles.regularHeader}>embrace wellness</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <InputBox placeholder="johndoe@email.com" width="100%" />
          <Text style={styles.inputText}>Password</Text>
          <InputBox
            placeholder="••••••••••"
            width="100%"
            secureTextEntry={true}
          />
          <View style={styles.forgotPasswordContainer}>
            <View></View>
            <ClickableText text="Forgot Password?" fontSize={12} />
          </View>
        </View>

        <View style={{ flex: 1 }}></View>

        <View>
          <TextButton text="Log In" onPress={() => navigation.navigate("Profile")}/>
          <View style={styles.smallTextContainer}>
            <Text style={styles.smallText}>Don't have an account?</Text>
            <Text> </Text>
            <ClickableText
              text="Sign Up"
              onPress={handleSignUpButtonPress}
              fontSize={16}
              maybeFontWeight="800"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    marginTop: 90,
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
  inputText: {
    color: "#3B83D1",
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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
