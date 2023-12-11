import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import InputBox from "../../components/inputBox";

const NewFoodEntryScreen = ({ navigation }) => {
  const [userInput, setUserInput] = useState("");
  const [matchedFoods, setMatchedFoods] = useState([]);
  const [showList, setShowList] = useState(false);
  const allFoods = ["Fried chicken", "Fried Kway Teow", "Fried Rice"];
  const handleInputChange = (text) => {
    setUserInput(text);
  };

  const handleInputSubmit = () => {
    const matched = findMatchedFoods(userInput);
    setMatchedFoods(matched);
  };

  const findMatchedFoods = (text) => {
    const filtered = allFoods.filter((food) =>
      food.toLowerCase().includes(text.toLowerCase())
    );
    return filtered;
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleFoodSelection(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleFoodSelection = (food) => {
    setUserInput(food);
    setShowList(false);
    setMatchedFoods([]);
    navigation.navigate("FoodEntrySummary");
  };

  return (
    <CommonLayout>
      <InputBox
        placeholder="Search for food"
        width="90%"
        secureTextEntry={false}
        maybeOnChangeText={handleInputChange}
        maybeValue={userInput}
        maybeOnSubmitEditing={handleInputSubmit}
      />
      <SafeAreaView style={styles.mainContainer}>
        {matchedFoods.length === 0 ? (
          <View style={styles.textBoxContainer}>
            <Text style={styles.textBoxHeader}>Log Your Meal</Text>
            <Text style={styles.textBoxText}>
              Be specific and add descriptive words such as "fried" or
              "steamed".
            </Text>
          </View>
        ) : (
          <FlatList
            data={matchedFoods}
            keyExtractor={(item) => item}
            renderItem={renderFoodItem}
          />
        )}
      </SafeAreaView>
    </CommonLayout>
  );
};

export default NewFoodEntryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  textBoxContainer: {
    height: "25%",
    width: "70%",
    backgroundColor: "#3B83D1",
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  textBoxHeader: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 16,
  },
  textBoxText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  dropdownItem: {
    width: "100%",
    padding: 2,
    fontSize: 16,
    backgroundColor: "#F8F9FB",
    zIndex: 9999,
  },
});
