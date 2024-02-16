import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CommonLayout from "./CommonLayout";
import { commonStyles } from "../styles/commonStyles";
import InputBox from "../components/inputBox";
import TextButton from "../components/touchable/textButton";

const GlucoseEditScreen = ({ navigation, route }) => {
  // const {id} = route.params

  const glucoseDetails = {
    diabetesType: "Type 1",
    lowerGlucoseLevel: 110,
    upperGlucoseLevel: 130,
  };

//   const lowerGlucoseLevel = glucoseDetails.lowerGlucoseLevel.toString

  const handleClick = () => {};

  return (
    <CommonLayout navigation={navigation}>
      <SafeAreaView style={commonStyles.mainContainer}>
        <View style={commonStyles.mainHeaderContainer}>
          <Text style={commonStyles.mainHeaderText}>Edit Glucose Details</Text>
        </View>

        <View style={styles.mainComponent}>
          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>First Name</Text>

            <InputBox
              placeholder={glucoseDetails.diabetesType}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Last Name</Text>

            <InputBox
              placeholder={glucoseDetails.lowerGlucoseLevel.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Age</Text>

            <InputBox
              placeholder={glucoseDetails.upperGlucoseLevel.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <TextButton
            text="Confirm"
            maybeButtonWidth="95%"
            onPress={handleClick}
          />
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default GlucoseEditScreen;

export const styles = StyleSheet.create({
  mainComponent: {
    height: "65%",
    width: "90%",
    padding: 16,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "#3B83D1",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  componentRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  inputHeader: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "600",
  },
});
