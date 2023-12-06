import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import { getDashboardAssets } from "../services/dashboardService";
import { DashboardDisplayAssets } from "../dtos/dashboardDTOs";

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
    res.status(500).json(`Error retrieving dashboard assets for user ${userId}`)
  }
});

export default router;
