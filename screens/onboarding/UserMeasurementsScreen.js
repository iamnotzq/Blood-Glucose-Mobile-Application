import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import InputBox from "../../components/inputBox";
import RightArrowButton from "../../components/touchable/rightArrowButton";
import ClickableText from "../../components/touchable/clickableText";

const UserMeasurementsScreen = ({ navigation }) => {
  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  const handleNextButtonPress = () => {
    navigation.navigate("UserDiabetes");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Let's Get Your</Text>
          <Text style={styles.headerText}>Measurements</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInputRow}>
            <InputBox placeholder="Age" width={150} />
            <InputBox placeholder="Gender" width={150} />
          </View>

          <View style={styles.textInputRow}>
            <InputBox placeholder="Weight" width={275} />

            <View style={styles.sideTextContainer}>
              <Text style={styles.sideText}>kg</Text>
            </View>
          </View>

          <View style={styles.textInputRow}>
            <InputBox placeholder="Height" width={275} />

            <View style={styles.sideTextContainer}>
              <Text style={styles.sideText}>cm</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}></View>

        <View>
          <View style={styles.buttonContainer}>
            <ClickableText
              text="Back"
              onPress={handleBackButtonPress}
              fontSize={24}
            />

            <RightArrowButton
              size={32}
              onPress={handleNextButtonPress}
              width={48}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserMeasurementsScreen;

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
