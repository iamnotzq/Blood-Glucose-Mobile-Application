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
  const meal = "Breakfast";
  const bloodGlucoseLevel = 140;

  return (
    <CommonLayout navigation={navigation}>
      <SafeAreaView style={styles.mainContainer} key="new-bg-record">
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.mainHeaderText}>Record Details</Text>
          <View></View>
        </View>

        <View style={styles.detailsContainer}>
          <View></View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.detailsRow}>
              <Text style={styles.detailsHeader}>Date</Text>
              <Text style={styles.detailsText}>{dateString}</Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.detailsHeader}>Time</Text>
              <Text style={styles.detailsText}>{timeString}</Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.detailsHeader}>Meal</Text>
              <Text style={styles.detailsText}>{meal}</Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.detailsHeader}>Glucose Levels</Text>
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <InputBox
                  placeholder=""
                  secureTextEntry={false}
                  maybeHeight={30}
                  width="50%"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesome5 name="check-circle" size={44} color="#3DD17B" />
          </TouchableOpacity>
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default NewBloodGlucoseRecordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  detailsContainer: {
    width: "90%",
    height: "40%",
    backgroundColor: "#ffffff",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "#3B83D1",
    borderWidth: 3,
  },
  detailsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  detailsHeader: {
    width: "50%",
    color: "#3B83D1",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    justifyContent: "center",
  },
  detailsText: {
    width: "50%",
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
