import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import RightArrowButton from "../../components/touchable/rightArrowButton";
import ClickableText from "../../components/touchable/clickableText";
import TextButton from "../../components/touchable/textButton";

const UserActivityLevelScreen = ({ route, navigation }) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    country,
    phoneNumber,
    age,
    gender,
    weight,
    height,
    diabetesType,
  } = route.params;

  const [activityLevel, setActivityLevel] = useState("");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>What is Your</Text>
          <Text style={styles.headerText}>Activity Level?</Text>
        </View>

        <View style={styles.textInputContainer}>
          <TextButton
            text="Sedentary"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setActivityLevel("Sedentary")}
          />
          <TextButton
            text="Lightly Active"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setActivityLevel("Lightly")}
          />
          <TextButton
            text="Moderately Active"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setActivityLevel("Moderately")}
          />
          <TextButton
            text="Very Active"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setActivityLevel("Very")}
          />
          <TextButton
            text="Extra Active"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setActivityLevel("Extra")}
          />
        </View>

        <View style={{ flex: 1 }}></View>

        <View>
          <View style={styles.buttonContainer}>
            <ClickableText
              text="Back"
              onPress={() => {
                navigation.goBack();
              }}
              fontSize={24}
            />

            <RightArrowButton
              size={32}
              onPress={() => {
                navigation.navigate("UserGlucoseLevels", {
                  username,
                  email,
                  password,
                  firstName,
                  lastName,
                  country,
                  phoneNumber,
                  age,
                  gender,
                  weight,
                  height,
                  diabetesType,
                  activityLevel,
                });
              }}
              width={48}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserActivityLevelScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#C4DAF1",
  },
  appText: {
    marginTop: 16,
    marginLeft: 32,
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
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
  headerText: {
    color: "#3B83D1",
    fontSize: 36,
    fontWeight: "400",
  },
  textInputContainer: {
    marginTop: 48,
    height: 300,
    width: 350,
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    justifyContent: "space-between",
    padding: 24,
  },
  sideTextContainer: {
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  sideText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
