import { View, Text } from "react-native";
import { commonStyles } from "../styles/commonStyles";

const FoodEntryComponent = ({ index, entry }) => {
  return (
    <View key={index} style={foodDiaryStyles.foodEntryComponent}>
      <View style={foodDiaryStyles.foodEntryComponentRow}>
        <Text style={foodDiaryStyles.foodEntryComponentHeader}>
          {entry.foodName}
        </Text>
        <View></View>
        <Text style={foodDiaryStyles.foodEntryComponentSubHeader}>
          {entry.timeConsumed}
        </Text>
      </View>

      <View style={foodDiaryStyles.foodEntryComponentDivider}></View>
      <View style={foodDiaryStyles.foodEntryComponentRow}>
        <View style={foodDiaryStyles.nutritionContainer}>
          <Text style={foodDiaryStyles.nutritionHeader}>Fat</Text>
          <Text style={foodDiaryStyles.nutritionText}>{entry.fat}g</Text>
        </View>

        <View style={foodDiaryStyles.nutritionContainer}>
          <Text style={foodDiaryStyles.nutritionHeader}>Carbs</Text>
          <Text style={foodDiaryStyles.nutritionText}>{entry.carbs}g</Text>
        </View>

        <View style={foodDiaryStyles.nutritionContainer}>
          <Text style={foodDiaryStyles.nutritionHeader}>Protein</Text>
          <Text style={foodDiaryStyles.nutritionText}>{entry.protein}g</Text>
        </View>

        <View style={foodDiaryStyles.nutritionContainer}>
          <Text style={foodDiaryStyles.nutritionHeader}>Calories</Text>
          <Text style={foodDiaryStyles.nutritionText}>
            {entry.calories} kcal
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FoodEntryComponent;
