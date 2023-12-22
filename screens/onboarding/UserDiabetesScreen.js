import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import RightArrowButton from "../../components/touchable/rightArrowButton";
import ClickableText from "../../components/touchable/clickableText";
import TextButton from "../../components/touchable/textButton";

const UserDiabetesScreen = ({ route, navigation }) => {
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
  } = route.params;

  const [diabetesType, setDiabetesType] = useState("");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>What is Your</Text>
          <Text style={styles.headerText}>Diabetes Type?</Text>
        </View>

        <View style={styles.textInputContainer}>
          <TextButton
            text="Type 1"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setDiabetesType("Type 1")}
          />
          <TextButton
            text="Type 2"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setDiabetesType("Type 2")}
          />
          <TextButton
            text="Gestational"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setDiabetesType("Gestational")}
          />
          <TextButton
            text="Others"
            maybeBackgroundColor="#F8F9FB"
            maybeTextColor="#3B83D1"
            maybeFontWeight="400"
            onPress={() => setDiabetesType("Others")}
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

export default UserDiabetesScreen;

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
