import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/inputBox";
import RightArrowButton from "../../components/touchable/rightArrowButton";
import ClickableText from "../../components/touchable/clickableText";
import { calculateCalories } from "../../hooks/commonHooks";

const UserGlucoseLevelsScreen = ({ route, navigation }) => {
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
    activityLevel,
  } = route.params;

  const caloricGoal = calculateCalories(
    height,
    weight,
    gender,
    age,
    activityLevel
  );

  const [targetLowerMgDl, setTargetLowerMgDl] = useState(0);
  const [targetUpperMgDl, setTargetUpperMgDl] = useState(0);
  const [caloricGoalKcal, setCaloricGoalKcal] = useState(caloricGoal);

  const hyperMgDl = targetUpperMgDl * 1.2;
  const hypoMgDl = targetLowerMgDl * 0.8;

  const handleCreateAccount = async () => {
    const userData = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      country: country,
      age: age,
      gender: gender,
      weightKg: weight,
      heightCm: height,
      diabetesType: diabetesType,
      medicationList: [],
      caloricGoalKcal: caloricGoalKcal,
      hyperMgDl: hyperMgDl,
      hypoMgDl: hypoMgDl,
      targetLowerMgDl: targetLowerMgDl,
      targetUpperMgDl: targetUpperMgDl,
    };

    try {
      const response = await fetch("http://localhost:8000/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const userId = await response.json();
        console.log(`User ${userId} has successfully been created`);

        navigation.navigate("Login");
      } else {
        console.error("User creation failed");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Let's Get Your</Text>
          <Text style={styles.headerText}>Glucose Levels & Caloric Goal</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInputRow}>
            <InputBox
              placeholder="Target Lower Level"
              width={275}
              maybeOnChangeText={(text) => setTargetLowerMgDl(text)}
              maybeValue={targetLowerMgDl}
            />

            <View style={styles.sideTextContainer}>
              <Text style={styles.sideText}>mg/dl</Text>
            </View>
          </View>

          <View style={styles.textInputRow}>
            <InputBox
              placeholder="Target Upper Level"
              width={275}
              maybeOnChangeText={(text) => setTargetUpperMgDl(text)}
              maybeValue={targetUpperMgDl}
            />

            <View style={styles.sideTextContainer}>
              <Text style={styles.sideText}>mg/dl</Text>
            </View>
          </View>

          <View style={styles.textInputRow}>
            <InputBox
              placeholder={`Recommended Caloric Goal: ${caloricGoal}`}
              width={275}
              maybeOnChangeText={(text) => setCaloricGoalKcal(text)}
              maybeValue={caloricGoalKcal}
            />

            <View style={styles.sideTextContainer}>
              <Text style={styles.sideText}>kcal</Text>
            </View>
          </View>
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

            <ClickableText
              text="Create Account"
              onPress={handleCreateAccount}
              fontSize={24}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserGlucoseLevelsScreen;

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
  },
  textInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
