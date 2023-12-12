import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import { createUser, loginUser } from "../services/userService";
import LoginRequestBody from "./models/requests/loginUserRequestBody";

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

    const userId = await loginUser(loginRequestBody);

    res.status(200).json(userId);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Login failed");
  }
});

export default router;
