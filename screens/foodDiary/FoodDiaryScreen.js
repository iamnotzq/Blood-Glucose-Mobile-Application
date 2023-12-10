import CommonLayout from "../CommonLayout";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { displayEntries } from "../../components/hooks/foodDiaryHooks";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ClickableText from "../../components/touchable/clickableText";

const FoodEntriesComponent = ({}) => {
  const breakfastEntries = [];
  const lunchEntries = [
    {
      description: "Laksa",
    },
    {
      description: "Maggi",
    },
    {
      description: "Prata",
    },
  ];
  const dinnerEntries = [];

  return (
    <View style={styles.foodEntriesContainer}>
      <View style={styles.foodEntriesComponent}>
        <View style={styles.componentHeader}>
          <Text style={styles.headerText}>Breakfast</Text>
        </View>
        <View style={styles.componentEntriesContainer}>
          {displayEntries(breakfastEntries)}
        </View>
      </View>

      <View style={styles.foodEntriesComponent}>
        <View style={styles.componentHeader}>
          <Text style={styles.headerText}>Lunch</Text>
        </View>
        <View style={styles.componentEntriesContainer}>
          {displayEntries(lunchEntries)}
        </View>
      </View>

      <View style={styles.foodEntriesComponent}>
        <View style={styles.componentHeader}>
          <Text style={styles.headerText}>Dinner</Text>
        </View>
        <View style={styles.componentEntriesContainer}>
          {displayEntries(breakfastEntries)}
        </View>
      </View>
    </View>
  );
};

const FoodDiaryScreen = () => {
  return (
    <CommonLayout>
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <ClickableText
            text="Food Dairy"
            fontSize={30}
            maybeFontWeight={600}
          />
          <View></View>
        </View>
        <FoodEntriesComponent />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity style={styles.foodEntrybutton}>
            <FontAwesome name="pencil-square-o" size={60} color="#ffffff" />
            <Text style={styles.buttonText}>Manual Entry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.foodEntrybutton}>
            <Ionicons name="ios-barcode-outline" size={60} color="#3B83D1" />
            <Text style={styles.buttonText}>Scan a Barcode</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default FoodDiaryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  foodEntriesContainer: {
    height: "70%",
    width: "90%",
    borderRadius: 16,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodEntriesComponent: {
    height: "30%",
    width: "100%",
    backgroundColor: "#F8F9FB",
    justifyContent: "space-between",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  componentHeader: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3B83D1",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  componentEntriesContainer: {
    height: "75%",
    justifyContent: "space-evenly",
    alignContent: "center",
  },

  foodEntrybutton: {
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
