import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "../repositories/database";
import {
  createUser,
  loginUser,
  validateNewUser,
} from "../services/userService";
import {
  LoginRequestBody,
  NewUserRequestBody,
} from "./models/requests/requestBodies";
import { NewUserResponseBody } from "./models/responses/responseBodies";

config();

const router = express.Router();

connectToDatabase();

router.post("/api/new-user/validate", async (req: Request, res: Response) => {
  try {
    const requestBody: NewUserRequestBody = req.body;
    const response: NewUserResponseBody = await validateNewUser(requestBody);
    const { isValid, status, message } = response;

    if (!isValid) {
      console.error(message);
    }

    console.log(message);
    res.status(status).json(message);
  } catch (err: any) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/create-user", async (req: Request, res: Response) => {
  try {
    const newUserId = await createUser(req.body);

    console.log(`User ${newUserId} has been created`);
    res.status(200).json(newUserId);
  } catch (err: any) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const loginRequestBody: LoginRequestBody = {
      email: email,
      password: password,
    };

    const userId = await loginUser(loginRequestBody);

    console.log(`User ${userId} has successfully logged in`);
    res.status(200).json(userId);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json("Login failed");
  }
});

export default router;
