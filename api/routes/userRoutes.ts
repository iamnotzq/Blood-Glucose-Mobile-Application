import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import { createUser, loginUser } from "../services/userService";
import LoginRequestBody from "./models/requests/loginUserRequestBody";
import { CalorieDisplay, DashboardAssets, BloodGlucoseDisplay } from "./models/responses/dashboardAssets";
import { Error } from "mongoose";

config();

const router = express.Router();

connectToDatabase();

router.post("/api/create-user", async (req: Request, res: Response) => {
    try {
        const newUserId = await createUser(req.body);
        res.status(200).json(newUserId);
    } catch (err: any) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/api/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const loginRequestBody = new LoginRequestBody(email, password);

        const str = await loginUser(loginRequestBody);

        //if successful, get dashboard assets

        res.status(200).json(str);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json("Login failed");
    }
});

router.get("/api/dashboard", async (req: Request, res: Response) => {
    // await userService.getDashboardAssets(userId, currentDate);
    console.log("Calling getDashboardAssets API");
    const calorieDisplay = new CalorieDisplay(
        2000,
        200,
        1800,
        10,
        [1500, 1600, 1700, 1800, 1900]
    );
    const bloodGlucoseDisplay = new BloodGlucoseDisplay(
        150,
        140,
        145,
        [120, 130, 140, 150, 140]
    );
    const dashboardAssets = new DashboardAssets(
        calorieDisplay,
        bloodGlucoseDisplay
    );

    res.status(200).json(dashboardAssets);
});

export default router;
