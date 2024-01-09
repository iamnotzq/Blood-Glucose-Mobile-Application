import express, { Request, Response } from "express";
import { config } from "dotenv";
import { updateMedicationList } from "../services/medicationService";
import User, { Medication } from "../repositories/models/user";
import { UpdateMedicationListRequestBody } from "./models/requests/requestBodies";

config();
const router = express.Router();

router.put(
  "/api/medication/update-medication-list/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    const requestBody: UpdateMedicationListRequestBody = req.body;
    try {
      const medication: Medication = {
        medicationName: requestBody.medicationName,
        dosage: requestBody.dosage,
        time: requestBody.time,
      };
      
      const result = await updateMedicationList(medication, userId);

      console.log(`Updated medication list with: ${requestBody}`);
      res.status(200).json(result);
    } catch (error: any) {
      console.error(`Error updating medication list: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
