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

const NewFoodEntryScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [userInput, setUserInput] = useState("");
  const [matchedFoods, setMatchedFoods] = useState([]);
  const [showList, setShowList] = useState(false);
  const allFoods = [
    "Fried chicken",
    "Fried Kway Teow",
    "Fried Rice",
    "Chicken Nuggets, McDonalds",
    "Coca Cola Coke",
    "Fish Ball Noodles",
    "Nasi Lemak with Chicken Wing",
    "Nasi Lemak with Egg",
    "Nasi Lemak, rice only",
    "Hokkien Mee",
    "Lor Mee",
    "Laksa",
    "Braised Duck with Yam Rice",
    "Char Siew Rice",
    "Braised Duck Rice",
    "Chicken Rice with Roasted Chicken",
    "Chicken Rice with Skin Removed",
    "Chicken Rice with Steamed Chicken",
    "Claypot Rice with Salted Fish, Chicken & Chinese Sausages",
    "Duck Rice with Skin Removed",
    "Fried Rice with Egg",
    "Char Siew Fried Rice",
    "Pineapple Fried Rice",
    "Roasted Duck Rice",
    "Seafood Fried Rice",
    "Thai Basil Beef with Rice",
    "Thai Basil Pork with Rice",
    "Thunder Tea Rice with Soup",
    "Burger, Big Mac, McDonalds",
    "Cheeseburger, McDonalds",
    "Fillet-o-fish, McDonalds",
    "French Fries, Large, McDonalds",
    "French Fries, Medium, McDonalds",
    "French Fries, Small, McDonalds",
    "Kimchi Pancake",
    "Korean Kimchi Soup",
    "McChicken, McDonalds",
    "McFlurry with Oreo Cookies, McDonalds",
    "McSpicy, McDonalds",
    "McWings, McDonalds",
    "Green Tea Drink",
    "Ice Lemon Tea",
    "Green Tea (no sugar)",
    "Black tea (no Sugar)",
    "Brewed Coffee",
    "Kopi C",
    "Teh",
    "Teh C kosong",
  ];
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
    navigation.navigate("FoodEntrySummary", { id: id, selectedFood: food });
  };

  return (
    <CommonLayout navigation={navigation} id={id}>
      <InputBox
        placeholder="Search for food"
        width="90%"
        secureTextEntry={false}
        maybeOnChangeText={handleInputChange}
        maybeValue={userInput}
        maybeOnSubmitEditing={handleInputSubmit}
      />
      <SafeAreaView style={styles.mainContainer} key="new-food-entry">
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
