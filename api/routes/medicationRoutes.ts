import express, { Request, Response } from "express";
import { config } from "dotenv";
import {
  addMedication,
  getMedicationList,
  updateMedicationDetails,
} from "../services/medicationService";
import User, { Medication } from "../repositories/models/user";
import {
  AddMedicationRequestBody,
  UpdateMedicationDetailsRequestBody,
} from "./models/requests/requestBodies";

config();
const router = express.Router();

router.get(
  "/api/medication/get-medication-list/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    try {
      const medicationList = await getMedicationList(userId);
      console.log(`Medication list for ${userId}: ${medicationList}`);
      res.status(200).json(medicationList);
    } catch (error: any) {
      console.error(`Error getting medication list for ${userId}}`);
      res.status(500).json({ error: "Inter Server Error" });
    }
  }
);

router.put(
  "/api/medication/update-medication-details/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    const requestBody: UpdateMedicationDetailsRequestBody = req.body;
    try {
      const result = await updateMedicationDetails(userId, requestBody);

      console.log(`Updated medication details with: ${requestBody}`);
      res.status(200).json(`Medication details have been updated`);
    } catch (error: any) {
      console.error(`Error updating medication details: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put(
  "/api/medication/add-medication/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    const requestBody: AddMedicationRequestBody = req.body;
    try {
      const result = await addMedication(requestBody, userId);

      console.log(`Updated medication list with: ${requestBody}`);
      res.status(200).json(result);
    } catch (error: any) {
      console.error(`Error updating medication list: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
