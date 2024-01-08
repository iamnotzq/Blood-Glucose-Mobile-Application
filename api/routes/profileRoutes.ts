import express, { Request, Response } from "express";
import { config } from "dotenv";
import { getProfileScreenAssets } from "../services/profileService";

config();
const router = express.Router();

router.get("/api/profile/:user_id", async (req: Request, res: Response) => {
  const userId = req.params.user_id;
  try {
    const assets = await getProfileScreenAssets(userId);

    console.log(assets);
    res.status(200).json(assets);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
