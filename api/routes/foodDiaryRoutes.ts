import express, { Request, Response } from "express";
import { config } from "dotenv";
import { AddFoodDiaryEntryRequestBody } from "./models/requests/requestBodies";
import {
  addFoodDiaryEntry,
  getNutritionalContent,
} from "../services/foodDiaryService";

config();

const router = express.Router();

router.get(
  "/api/food/nutritional-content/:foodName",
  async (req: Request, res: Response) => {
    const foodName = req.params.foodName;
    try {
      const content = await getNutritionalContent(foodName);
      res.status(200).json(content);
    } catch (error: any) {
      console.error(`Error in retrieving nutritional content`);
      throw new Error(`Error ${error.message}`);
    }
  }
);

router.post("/api/food/new-entry", async (req: Request, res: Response) => {
  try {
    const reqBody: AddFoodDiaryEntryRequestBody = req.body;
    const id = await addFoodDiaryEntry(reqBody);

    console.log(`New food diary entry created: ${id}`);
    res.status(200).json(id);
  } catch (error: any) {
    console.error(`Error in creating food diary entry`);
    throw new Error(`Error ${error.message}`);
  }
});

export default router;
