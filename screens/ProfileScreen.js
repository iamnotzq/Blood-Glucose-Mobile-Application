import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import CommonLayout from "./CommonLayout";

const ProfileScreen = () => {
  const firstName = "John";
  const lastName = "Doe";
  const age = 25;
  const diabetesType = "Type 1";
  const height = 170;
  const weight = 65;
  const calorieGoal = 2000;
  const hypo = 70;
  const acceptableLower = 110;
  const acceptableUpper = 130;
  const hyper = 140;

  return (
    <CommonLayout>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.topTextContainer}>
            <Text style={styles.nameText}>
              {firstName} {lastName}, {age}
            </Text>
            <Text style={styles.diabetesText}>{diabetesType} Diabetes</Text>
          </View>

          <View style={styles.componentsContainer}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoHeaderText}>Basic Measurements</Text>

              <View style={styles.userInfoComponentsContainer}>
                <View style={styles.userInfoComponent}>
                  <Text style={styles.userInfoComponentHeader}>{height}</Text>
                  <Text style={styles.userInfoComponentText}>Height</Text>
                </View>

                <View style={styles.userInfoComponent}>
                  <Text style={styles.userInfoComponentHeader}>{weight}</Text>
                  <Text style={styles.userInfoComponentText}>Weight</Text>
                </View>
                <View style={styles.userInfoComponent}>
                  <Text style={styles.userInfoComponentHeader}>
                    {calorieGoal}
                  </Text>
                  <Text style={styles.userInfoComponentText}>Calorie Goal</Text>
                </View>
              </View>

              <View style={styles.divider}></View>

              <Text style={styles.userInfoHeaderText}>
                Blood Glucose Levels
              </Text>
              <View style={styles.userInfoComponentsContainer}>
                <View style={styles.userInfoComponent}>
                  <Text style={styles.userInfoComponentHeader}>{hypo}</Text>
                  <Text style={styles.userInfoComponentText}>Hypo</Text>
                </View>

                <View style={styles.userInfoComponent}>
                  <Text style={styles.userInfoComponentHeader}>
                    {acceptableLower} - {acceptableUpper}
                  </Text>
                  <Text style={styles.userInfoComponentText}>Acceptable</Text>
                </View>

                <View style={styles.userInfoComponent}>
                  <Text style={styles.userInfoComponentHeader}>{hyper}</Text>
                  <Text style={styles.userInfoComponentText}>Hyper</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </CommonLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  height: "100%",
  mainContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  componentsContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },

  topTextContainer: {
    marginVertical: 24,
    justifyContent: "center",
    alignContent: "center",
  },
  nameText: {
    color: "#3B83D1",
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
  },
  diabetesText: {
    color: "#3B83D1",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  userInfoContainer: {
    height: 250,
    width: "100%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    justifyContent: "space-evenly",
    alignContent: "center",
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  userInfoComponentsContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  userInfoHeaderText: {
    marginTop: 8,
    marginLeft: 5,
    color: "#ffffff",
    fontWeight: "700",
    opacity: 0.8,
  },
  userInfoComponent: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 120,
  },
  userInfoComponentHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  userInfoComponentText: {
    marginTop: 4,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.8,
  },
  divider: {
    height: 3,
    width: "100%",
    backgroundColor: "#ffffff",
    opacity: 0.5,
    borderRadius: 16,
  },
});
