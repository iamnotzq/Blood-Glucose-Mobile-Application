import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import { getDashboardAssets } from "../services/dashboardService";
import { DashboardDisplayAssets } from "../dtos/dashboardDTOs";
import NutritionalContent from "../repositories/models/nutritionalContent";

config();

const router = express.Router();

connectToDatabase();

router.get("/api/dashboard/:user_id", async (req: Request, res: Response) => {
  const userId = req.params.user_id;
  try {
    const dashboardAssets: DashboardDisplayAssets = await getDashboardAssets(
      userId
    );
    res.status(200).json(dashboardAssets);
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json(`Error retrieving dashboard assets for user ${userId}`);
  }
});

router.post("/api/nutritionalcontent", async (req: Request, res: Response) => {
  const nutritionalContent = {
    foodName: "Fried Kway Teow",
    calories: 500,
    carbohydrates: 60,
    sodium: 800,
    fat: 25,
    fiber: 5,
  };

  const content = new NutritionalContent(nutritionalContent);
  try {
    await content.save();

    const id = content._id;
    res.status(200).json(id);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json(`Error`);
  }
});

export default router;
