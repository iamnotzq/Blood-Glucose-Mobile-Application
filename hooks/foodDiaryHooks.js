import { ScrollView, View, Text } from "react-native";
import { foodDiaryStyles } from "../styles/foodDiaryStyles";
import FoodEntryComponent from "../components/foodEntryComponent";

export const displayFoodEntries = (foodEntries) => {
  return foodEntries.map((entry, index) => {
    return <FoodEntryComponent index={index} entry={entry} />;
  });
};

export const renderFoodEntrySection = (foodEntries) => {
  if (foodEntries.length > 0) {
    return (
      <ScrollView
        style={foodDiaryStyles.foodEntryContainer}
        contentContainerStyle={foodDiaryStyles.foodEntryContentContainer}
      >
        {displayFoodEntries(foodEntries)}
      </ScrollView>
    );
  }

  return (
    <View style={foodDiaryStyles.textBoxContainer}>
      <Text style={foodDiaryStyles.textBoxText}>No food logs for today</Text>
      <Text></Text>
      <Text style={foodDiaryStyles.textBoxSubText}>
        Tap the 'New Entry' button to log your first meal of the day
      </Text>
    </View>
  );
};
