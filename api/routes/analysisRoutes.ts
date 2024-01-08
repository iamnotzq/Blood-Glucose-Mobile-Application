import express, { Request, Response } from "express";
import { config } from "dotenv";
import { getAnalysisAssets } from "../services/analysisService";
import { GetAnalysisAssetsResponseBody } from "./models/responses/responseBodies";

config();

const router = express.Router();

router.get("/api/analysis/:user_id", async (req: Request, res: Response) => {
  const userId = req.params.user_id;
  try {
    const assets: GetAnalysisAssetsResponseBody = await getAnalysisAssets(
      userId
    );

    console.log(`Displaying analysis assets for: ${userId}`);
    res.status(200).json(assets);
  } catch (error: any) {
    console.error(`Error in displaying analysis assets`);
    throw new Error(`Error ${error.message}`);
  }
});

export default router;
