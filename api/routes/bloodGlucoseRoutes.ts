import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import { AddBloodGlucoseEntryRequestBody } from "./models/requests/requestBodies";
import { addBloodGlucoseEntry } from "../services/bloodGlucoseService";

config();

const router = express.Router();

connectToDatabase();

router.post("/api/glucose/new-entry", async (req: Request, res: Response) => {
  try {
    const reqBody: AddBloodGlucoseEntryRequestBody = req.body;
    const id = await addBloodGlucoseEntry(reqBody);

    console.log(`New glucose entry created: ${id}`);
    res.status(200).json(id);
  } catch (error: any) {
    console.error(`Error in creating glucose entry`);
    throw new Error(`Error ${error.message}`);
  }
});

export default router;
