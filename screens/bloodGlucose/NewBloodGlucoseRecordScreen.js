import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import React from "react";
import { useDateTime } from "../../components/hooks/commonHooks";
import InputBox from "../../components/inputBox";
import { FontAwesome5 } from "@expo/vector-icons";
import ClickableText from "../../components/touchable/clickableText";

const NewBloodGlucoseRecordScreen = ({ navigation }) => {
  const { dateString, timeString } = useDateTime();
  const bloodGlucoseLevel = 140;

  return (
    <CommonLayout>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <ClickableText
          text="Add New Record"
          fontSize={34}
          maybeFontWeight="600"
        />
        <View></View>
      </View>
      <SafeAreaView style={styles.mainContainer} key="new-bg-record">
        <View style={styles.componentsContainer}>
          <Text style={styles.header}>Record Details</Text>
          <View style={styles.divider}></View>
          <View style={styles.rowContainer}>
            <View style={styles.rowObject}>
              <Text style={styles.mainText}>Date</Text>
            </View>
            <View style={styles.rowObject}>
              <Text style={styles.mainText}>{dateString}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowObject}>
              <Text style={styles.mainText}>Time</Text>
            </View>
            <View style={styles.rowObject}>
              <Text style={styles.mainText}>{timeString}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowObject}>
              <Text style={styles.mainText}>Glucose Level</Text>
            </View>

            <View style={styles.rowObject}>
              <InputBox
                placeholder=""
                width="50%"
                secureTextEntry={false}
                maybeHeight={30}
              />
              <Text style={styles.mainText}>mg/dl</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => navigation.navigate("Profile")}
          >
            <FontAwesome5 name="check-circle" size={40} color="#3DD17B" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default NewBloodGlucoseRecordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  componentsContainer: {
    height: "50%",
    width: "90%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  header: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  rowContainer: {
    width: "100%",
    backgroundColor: "#3B83D1",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rowObject: {
    width: "50%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mainText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#ffffff",
    margin: 16,
    opacity: 0.7,
  },
});
