import FoodDiaryEntry, {
  FoodDiaryEntryDocument,
  NutritionalContentDocument,
} from "../../../repositories/models/foodDiaryEntry";

import BloodGlucoseEntry, {
  BloodGlucoseEntryDocument,
} from "../../../repositories/models/bloodGlucoseEntry";

export const FakeUserId = "656aed89594fc49ef5cac032";

export const FakeTimestamp = new Date(Date.UTC(2023, 11, 23, 0, 0, 0, 0));

export const FakeNutritionalContentDocument: NutritionalContentDocument = {
  calories: 250,
  carbohydrates: 30,
  sodium: 400,
  fat: 15,
  fiber: 5,
};

export const FakeFoodEntryDocument: FoodDiaryEntryDocument = {
  userId: FakeUserId,
  timestamp: FakeTimestamp,
  foodName: "Chicken Rice",
  portionSize: 1,
  mealType: "Lunch",
  mealDescription: "This is my lunch",
  nutritionalContent: FakeNutritionalContentDocument,
} as FoodDiaryEntryDocument;

export const FakeFoodEntries: FoodDiaryEntryDocument[] = [
  {
    userId: FakeUserId,
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
    userId: FakeUserId,
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
    userId: FakeUserId,
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

export const FakeMixedFoodEntries: FoodDiaryEntryDocument[] = [
  {
    userId: FakeUserId,
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
    userId: FakeUserId,
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
    userId: FakeUserId,
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
    userId: FakeUserId,
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
    userId: FakeUserId,
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

export const FakeBloodGlucoseEntries: BloodGlucoseEntryDocument[] = [
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 23, 23, 0, 0, 0)),
    glucoseLevel: 150,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 23, 12, 0, 0, 0)),
    glucoseLevel: 160,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 23, 8, 0, 0, 0)),
    glucoseLevel: 140,
  } as BloodGlucoseEntryDocument,
];

export const MockBloodGlucoseEntries: BloodGlucoseEntryDocument[] = [
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 23, 0, 0, 0, 0)),
    glucoseLevel: 150,
  } as BloodGlucoseEntryDocument,
  {
    userId: "656db5f588e3c644c1fbf909",
    timestamp: new Date(Date.UTC(2023, 11, 23, 0, 0, 0, 0)),
    glucoseLevel: 160,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 23, 0, 0, 0, 0)),
    glucoseLevel: 160,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 23, 0, 0, 0, 0)),
    glucoseLevel: 140,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 22, 23, 59, 59, 999)),
    glucoseLevel: 150,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 21, 8, 0, 0, 0)),
    glucoseLevel: 140,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 20, 8, 0, 0, 0)),
    glucoseLevel: 140,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 20, 8, 0, 0, 0)),
    glucoseLevel: 130,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 19, 8, 0, 0, 0)),
    glucoseLevel: 120,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 18, 8, 0, 0, 0)),
    glucoseLevel: 135,
  } as BloodGlucoseEntryDocument,
  {
    userId: FakeUserId,
    timestamp: new Date(Date.UTC(2023, 11, 17, 8, 0, 0, 0)),
    glucoseLevel: 140,
  } as BloodGlucoseEntryDocument,
  {
    userId: "656db5f588e3c644c1fbf909",
    timestamp: new Date(Date.UTC(2023, 11, 8, 0, 0, 0, 0)),
    glucoseLevel: 140,
  } as BloodGlucoseEntryDocument,
];
