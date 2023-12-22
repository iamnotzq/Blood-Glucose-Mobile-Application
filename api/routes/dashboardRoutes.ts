import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import { getDashboardAssets } from "../services/dashboardService";
import { DashboardDisplayAssets } from "../dtos/dashboardDTOs";
import { fakeDashboardAssets } from "../tests/unit/routes/fakes";

config();

const router = express.Router();

connectToDatabase();

// router.get("/api/dashboard/:user_id", async (req: Request, res: Response) => {
//   const userId = req.params.user_id;
//   try {
//     const dashboardAssets: DashboardDisplayAssets = await getDashboardAssets(
//       userId
//     );
//     res.status(200).json(dashboardAssets);
//   } catch (error: any) {
//     console.error(error.message);
//     res
//       .status(500)
//       .json(`Error retrieving dashboard assets for user ${userId}`);
//   }
// });

router.get("/api/dashboard/", async (req: Request, res: Response) => {
  const currentTimestamp = new Date();
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock format
  };
  const formattedTime = currentTimestamp.toLocaleTimeString([], timeOptions);

  try {
    const dashboardAssets: DashboardDisplayAssets = fakeDashboardAssets;
    console.log(`get-dashboard-assets called at ${formattedTime}`);
    res.status(200).json(dashboardAssets);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json(`Error retrieving dashboard assets for user`);
  }
});

export default router;
