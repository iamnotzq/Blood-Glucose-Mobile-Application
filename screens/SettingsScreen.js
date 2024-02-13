import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "./CommonLayout";

const SettingsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.row}>
          <Text style={styles.mainHeaderText}>Settings</Text>
          <View></View>
        </View>

        <View style={styles.clickableContainer}>
          <TouchableOpacity
            style={[
              styles.clickable,
              { borderBottomWidth: 0, borderTopWidth: 0 },
            ]}
          >
            <Text style={styles.clickableText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.clickable, { borderBottomWidth: 0 }]}
          >
            <Text style={styles.clickableText}>Nutritional Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.clickable, { borderBottomWidth: 0 }]}
          >
            <Text style={styles.clickableText}>Glucose Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.clickable, { borderBottomWidth: 0 }]}
          >
            <Text style={styles.clickableText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E8EBF2",
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
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clickableContainer: {
    height: "30%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  clickable: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ffffff",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 3,
    backgroundColor: "#3B83D1",
    borderColor: "#ffffff",
  },
  clickableText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
});
