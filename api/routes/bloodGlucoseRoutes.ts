import express, { Request, Response } from "express";
import { config } from "dotenv";
import { AddBloodGlucoseEntryRequestBody } from "./models/requests/requestBodies";
import {
  addBloodGlucoseEntry,
  getBloodGlucoseChartData,
  getRecentRecord,
  getTodayGlucoseRecords,
} from "../services/bloodGlucoseService";
import {
  GetBloodGlucoseChartDataResponseBody,
  GetTodayGlucoseRecordsResponseBody,
} from "./models/responses/responseBodies";
import { idText } from "typescript";

config();

const router = express.Router();

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

router.get(
  "/api/glucose/get-chart-data/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    try {
      const chartData: GetBloodGlucoseChartDataResponseBody =
        await getBloodGlucoseChartData(userId);

      console.log(`Blood glucose chart data: ${chartData}`);
      res.status(200).json(chartData);
    } catch (error: any) {
      console.error(`Error in retrieving chart data for: ${userId}`);
      throw new Error(`Error ${error.message}`);
    }
  }
);

router.get(
  "/api/glucose/get-todays-records/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    try {
      const records: GetTodayGlucoseRecordsResponseBody =
        await getTodayGlucoseRecords(userId);

      console.log(`Todays glucose records: ${records}`);
      res.status(200).json(records);
    } catch (error: any) {
      console.error(
        `Error in retrieving Todays glucose records for: ${userId}`
      );
      throw new Error(`Error ${error.message}`);
    }
  }
);

router.get(
  "/api/glucose/get-recent-record/:user_id",
  async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    try {
      const previousRecord = await getRecentRecord(userId);

      console.log(`Recent record: ${previousRecord}`);
      res.status(200).json(previousRecord);
    } catch (error: any) {
      console.error(
        `Error in retrieving Todays glucose record for: ${userId}`
      );
      throw new Error(`Error ${error.message}`);
    }
  }
);

export default router;
