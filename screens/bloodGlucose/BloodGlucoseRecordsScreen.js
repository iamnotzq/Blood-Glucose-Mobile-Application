import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import CommonLayout from "../CommonLayout";
import ClickableText from "../../components/touchable/clickableText";
import TextButton from "../../components/touchable/textButton";

const BloodGlucoseRecordsScreen = () => {
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
    <CommonLayout>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.recordsBox}>
          <View style={styles.recordsBoxComponent}>
            <ClickableText
              text={date}
              fontSize={28}
              maybeTextColor="#ffffff"
              maybeFontWeight={700}
            />
            <View style={styles.divider}></View>
          </View>
          {displayRecords(bloodGlucoseRecords)}

          <TextButton
            text="New Record"
            maybeBackgroundColor="#ffffff"
            maybeTextColor="#3B83D1"
            maybeBorderColor="#3B83D1"
          />
        </View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default BloodGlucoseRecordsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
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
});
