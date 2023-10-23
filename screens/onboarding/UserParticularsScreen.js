import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import InputBox from "../../components/inputBox";
import RightArrowButton from "../../components/touchable/rightArrowButton";
import TextButton from "../../components/touchable/textButton";

const UserParticularsScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Enter Your</Text>
          <Text style={styles.headerText}>Particulars</Text>
        </View>

        <View style={styles.textInputContainer}>
          <InputBox placeholder="First Name" />
          <InputBox placeholder="Last Name" />
          <InputBox placeholder="Country" />
        </View>

        <View style={{ flex: 1 }}></View>

        <View>
          <View style={styles.buttonContainer}>
            <TextButton text="Back" fontSize={24} />

            <RightArrowButton size={32} width={48} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserParticularsScreen;

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
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
