import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

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
          <KeyboardAvoidingView>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#9CC0E8"
              style={styles.textInput}
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#9CC0E8"
              style={styles.textInput}
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <TextInput
              placeholder="Country"
              placeholderTextColor="#9CC0E8"
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
        </View>

        <View style={{ flex: 1 }}></View>

        <View style={styles.navigationContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.arrowButtonContainer}>
              <AntDesign name="arrowright" size={32} color="#F8F9FB" />
            </TouchableOpacity>
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
  textInputContainer: {},
  textInput: {
    height: 48,
    width: "100%",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#3B83D1",
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  navigationContainer: {},
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  backText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "400",
  },
  arrowButtonContainer: {
    height: "auto",
    width: 48,
    borderRadius: 16,
    backgroundColor: "#3B83D1",
    justifyContent: "center",
    alignItems: "center",
  },
});
