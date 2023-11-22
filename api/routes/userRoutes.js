const express = require("express");
require("dotenv").config();
require("../models/db");
const router = express.Router();
const userService = require("../services/userService");
const LoginRequestBody = require("./models/requests/loginUserRequestBody");
const {
  CalorieDisplay,
  BloodGlucoseDisplay,
  DashboardAssets,
} = require("./models/responses/dashboardAssets");

router.post("/api/create-user", async (req, res) => {
  try {
    const newUserId = await userService.createUser(req.body);
    res.status(200).json(newUserId);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginRequestBody = new LoginRequestBody(email, password);

    const str = await userService.loginUser(loginRequestBody);

    //if successful, get dashboard assets

    res.status(200).json(str);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Login failed");
  }
});

router.get("/api/dashboard", async (req, res) => {
  // await userService.getDashboardAssets(userId, currentDate);
  const calorieDisplay = CalorieDisplay(
    2000,
    200,
    1800,
    10,
    [1500, 1600, 1700, 1800, 1900]
  );
  const bloodGlucoseDisplay = BloodGlucoseDisplay(
    150,
    140,
    145,
    [120, 130, 140, 150, 140]
  );
  const dashboardAssets = DashboardAssets(calorieDisplay, bloodGlucoseDisplay);

  res.status(200).json(dashboardAssets);
});

module.exports = router;
