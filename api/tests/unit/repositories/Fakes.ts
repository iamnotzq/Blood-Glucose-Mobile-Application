import FoodDiaryEntry, {
  FoodDiaryEntryDocument,
  NutritionalContentDocument,
} from "../../../repositories/models/foodDiaryEntry";

const FakeDate = new Date(Date.UTC(2023, 11, 23, 0, 0, 0, 0));

const FakeNutritionalContentDocument: NutritionalContentDocument = {
  calories: 250,
  carbohydrates: 30,
  sodium: 400,
  fat: 15,
  fiber: 5,
};

const FakeFoodEntryDocument: FoodDiaryEntryDocument = {
  userId: "656aed89594fc49ef5cac032",
  timestamp: FakeDate,
  foodName: "Chicken Rice",
  portionSize: 1,
  mealType: "Lunch",
  mealDescription: "This is my lunch",
  nutritionalContent: FakeNutritionalContentDocument,
} as FoodDiaryEntryDocument;

const FakeFoodEntries: FoodDiaryEntryDocument[] = [
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 2, 0, 0, 0, 0)),
    foodName: "Cereal",
    portionSize: 1,
    mealType: "Breakfast",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 100,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 2, 12, 0, 0, 0)),
    foodName: "Chicken Rice",
    portionSize: 2,
    mealType: "Lunch",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 200,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 2, 23, 59, 59, 999)),
    foodName: "Salad",
    portionSize: 0.5,
    mealType: "Dinner",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 300,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
];

const FakeMixedFoodEntries: FoodDiaryEntryDocument[] = [
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 2, 0, 0, 0, 0)),
    foodName: "Cereal",
    portionSize: 1,
    mealType: "Breakfast",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 100,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 2, 12, 0, 0, 0)),
    foodName: "Chicken Rice",
    portionSize: 2,
    mealType: "Lunch",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 200,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 2, 23, 59, 59, 999)),
    foodName: "Salad",
    portionSize: 0.5,
    mealType: "Dinner",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 300,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 7, 0, 0, 0, 0)),
    foodName: "Chicken Pau",
    portionSize: 1,
    mealType: "Breakfast",
    mealDescription: "This is my breakfast",
    nutritionalContent: {
      calories: 150,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656aed89594fc49ef5cac032",
    timestamp: new Date(Date.UTC(2023, 11, 3, 12, 0, 0, 0)),
    foodName: "Hor Fun",
    portionSize: 2,
    mealType: "Lunch",
    mealDescription: "This is my lunch",
    nutritionalContent: {
      calories: 175,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
  {
    userId: "656b37d806383d43a9ebc7f2",
    timestamp: new Date(Date.UTC(2023, 10, 27, 23, 59, 59, 999)),
    foodName: "Fishball Noodes",
    portionSize: 4,
    mealType: "Dinner",
    mealDescription: "This is my dinner",
    nutritionalContent: {
      calories: 420,
      carbohydrates: 30,
      sodium: 400,
      fat: 15,
      fiber: 5,
    },
  } as FoodDiaryEntryDocument,
];

export {
  FakeFoodEntries,
  FakeFoodEntryDocument,
  FakeNutritionalContentDocument,
  FakeMixedFoodEntries,
};
