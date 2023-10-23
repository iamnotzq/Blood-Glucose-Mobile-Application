import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import TextButton from "../components/touchable/textButton";
import ClickableText from "../components/touchable/clickableText";

const WelcomeScreen = ({ navigation }) => {
  const handleLoginbuttonPress = () => {
    navigation.navigate("Login");
  };
  const handleCreateAccountbuttonPress = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.componentsContainer}>
        <View></View>

        <View>
          <Text style={styles.appText}>NUTRIWISE</Text>
          <Text style={styles.subHeading}>
            Your Food Diary and Health Partner
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TextButton
            text="Let's Get Started"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            onPress={handleLoginbuttonPress}
          />

          <View style={styles.smallTextContainer}>
            <ClickableText
              text="Create Account"
              fontSize={16}
              maybeTextColor="#F8F9FB"
              onPress={handleCreateAccountbuttonPress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#3B83D1",
  },
  componentsContainer: {
    marginTop: 90,
    paddingHorizontal: 48,
    justifyContent: "space-between",
    alignContent: "center",
    flexGrow: 1,
  },
  appText: {
    marginTop: 32,
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
  smallTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
