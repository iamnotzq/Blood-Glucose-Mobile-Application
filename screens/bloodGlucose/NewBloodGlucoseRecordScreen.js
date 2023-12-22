import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import { useDateTime } from "../../components/hooks/commonHooks";
import InputBox from "../../components/inputBox";
import { FontAwesome5 } from "@expo/vector-icons";

const NewBloodGlucoseRecordScreen = ({ navigation, route }) => {
  const [glucoseLevel, setGlucoseLevel] = useState("");

  const { id } = route.params;
  const timestamp = new Date();

  console.log(timestamp);
  const { dateString, timeString } = useDateTime();

  const handleClick = async () => {
    const reqBody = {
      userId: id,
      timestamp: timestamp,
      glucoseLevel: glucoseLevel,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/glucose/new-entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (response.ok) {
        const newId = await response.json();
        console.log(`Glucose entry has been created: ${newId}`);

        navigation.navigate("Dashboard", { id: id });
      } else {
        console.error("Glucose entry creation failed");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <CommonLayout navigation={navigation} id={id}>
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
                  maybeOnChangeText={(text) => setGlucoseLevel(text)}
                  maybeValue={glucoseLevel}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleClick}>
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
