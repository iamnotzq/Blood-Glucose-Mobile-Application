import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import ClickableText from "../../components/touchable/clickableText";
import TextButton from "../../components/touchable/textButton";
import { FontAwesome } from "@expo/vector-icons";

const BloodGlucoseRecordsScreen = ({ navigation }) => {
  const bloodGlucoseRecords = [
    {
      glucoseLevel: 140,
      time: "6:41 pm",
    },
    {
      glucoseLevel: 127,
      time: "4:30 pm",
    },
    {
      glucoseLevel: 130,
      time: "11:27 am",
    },
    {
      glucoseLevel: 118,
      time: "9:32 am",
    },
  ];
  const date = "11 December 2023";

  const displayRecords = (records) => {
    return records.length === 0 ? (
      <View>
        <Text style={styles.noEntriesText}>No records for today</Text>
      </View>
    ) : (
      <View style={{ width: "100%" }}>
        <View style={styles.recordRowContainer}>
          <View style={styles.glucoseTextContainer}>
            <Text style={styles.mainText}>Level</Text>
          </View>
          <View style={styles.glucoseTextContainer}>
            <Text style={styles.mainText}>Time</Text>
          </View>
        </View>
        {records.map((record) => {
          return (
            <View style={styles.recordRowContainer}>
              <View style={styles.glucoseTextContainer}>
                <Text style={styles.mainText}>{record.glucoseLevel} mg/dl</Text>
              </View>
              <View style={styles.glucoseTextContainer}>
                <Text style={styles.mainText}>{record.time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <CommonLayout navigation={navigation}>
      <SafeAreaView style={styles.mainContainer} key="bg-records">
        <View
          style={{
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Text style={styles.mainHeaderText}>Glucose Records</Text>
          </View>
          <View style={{ margin: 4 }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <ClickableText text={date} fontSize={18} maybeFontWeight={400} />
          </View>
        </View>

        <View
          style={{
            width: "90%",
            height: "50%",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#ffffff",
            borderRadius: 16,
            borderWidth: 3,
            borderColor: "#3B83D1",
            shadowColor: "black",
            shadowOffset: {
              height: 3,
              width: 0,
            },
            shadowOpacity: 0.3,
          }}
        >
          <View>{displayRecords(bloodGlucoseRecords)}</View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NewBloodGlucoseRecord")}
        >
          <FontAwesome name="pencil-square-o" size={50} color="#ffffff" />
          <Text style={styles.buttonText}>New Records</Text>
        </TouchableOpacity>
        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default BloodGlucoseRecordsScreen;

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
  recordsBox: {
    height: "60%",
    width: "90%",
    backgroundColor: "#3B83D1",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    padding: 36,
  },
  recordsBoxComponent: {
    width: "100%",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#ffffff",
    margin: 16,
    opacity: 0.7,
  },
  recordRowContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  glucoseTextContainer: {
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignContent: "center",
  },
  mainText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  noEntriesText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    height: 125,
    width: 125,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B83D1",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: "#ffffff",
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
