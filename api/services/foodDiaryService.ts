import NutritionalContent, {
  NutritionalContentDocument,
} from "../repositories/models/nutritionalContent";
import FoodDiaryEntry from "../repositories/models/foodDiaryEntry";
import { AddFoodDiaryEntryRequestBody } from "../routes/models/requests/requestBodies";
import { AddFoodDiaryEntryResponseBody } from "../routes/models/responses/responseBodies";

export const getNutritionalContent = async (
  foodName: string
): Promise<NutritionalContentDocument> => {
  const doc = await NutritionalContent.findOne({ foodName });
  return doc;
};

export const addFoodDiaryEntry = async (
  requestBody: AddFoodDiaryEntryRequestBody
): Promise<AddFoodDiaryEntryResponseBody> => {
  const {
    userId,
    timestamp,
    foodName,
    portionSize,
    mealType,
    mealDescription,
  } = requestBody;
  const document: NutritionalContentDocument = await NutritionalContent.findOne(
    { foodName }
  );

  const { calories, carbohydrates, sodium, fat, fiber } = document;
  const nutritionalContent = {
    calories: calories * portionSize,
    carbohydrates: carbohydrates * portionSize,
    sodium: sodium * portionSize,
    fat: fat * portionSize,
    fiber: fiber * portionSize,
  };

  const entryFields = {
    userId: userId,
    timestamp: timestamp,
    foodName: foodName,
    portionSize: portionSize,
    mealType: mealType,
    mealDescription: mealDescription,
    nutritionalContent: nutritionalContent,
  };

  const newEntry = new FoodDiaryEntry(entryFields);

  try {
    await newEntry.save();

    return nutritionalContent;
  } catch (error: any) {
    console.error(`Error in adding food diary entry`);
    throw new Error(error.message);
  }
};
