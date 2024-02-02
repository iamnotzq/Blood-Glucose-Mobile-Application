import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import ClickableText from "../../components/touchable/clickableText";
import { FontAwesome } from "@expo/vector-icons";
import {
  renderBloodGlucoseRecords,
  displayCurrentDate,
} from "../../hooks/bloodGlucoseHooks";
import { fetchTodaysBloodGlucoseRecords } from "../../hooks/apiHooks";

const BloodGlucoseRecordsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { records, loading } = fetchTodaysBloodGlucoseRecords(id, navigation);

  const date = displayCurrentDate();

  if (loading) return <Text>Loading</Text>;

  return (
    <CommonLayout navigation={navigation} id={id}>
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
            height: "70%",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderBloodGlucoseRecords(records)}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("NewBloodGlucoseRecord", { id: id })
          }
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
