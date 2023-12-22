import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/inputBox";
import RightArrowButton from "../../components/touchable/rightArrowButton";
import ClickableText from "../../components/touchable/clickableText";

const UserParticularsScreen = ({ navigation, route }) => {
  const { username, email, password } = route.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.appText}>NUTRIWISE</Text>

      <View style={styles.componentsContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Enter Your</Text>
          <Text style={styles.headerText}>Particulars</Text>
        </View>

        <View style={styles.textInputContainer}>
          <InputBox
            placeholder="First Name"
            width="100%"
            maybeOnChangeText={(text) => setFirstName(text)}
            maybeValue={firstName}
          />
          <InputBox
            placeholder="Last Name"
            width="100%"
            maybeOnChangeText={(text) => setLastName(text)}
            maybeValue={lastName}
          />
          <InputBox
            placeholder="Country"
            width="100%"
            maybeOnChangeText={(text) => setCountry(text)}
            maybeValue={country}
          />
          <InputBox
            placeholder="Phone Number"
            width="100%"
            maybeOnChangeText={(text) => setphoneNumber(text)}
            maybeValue={phoneNumber}
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
                navigation.navigate("UserMeasurements", {
                  username: username,
                  email: email,
                  password: password,
                  firstName: firstName,
                  lastName: lastName,
                  country: country,
                  phoneNumber: phoneNumber,
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
