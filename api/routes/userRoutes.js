const express = require("express");
require("dotenv").config();
require("../models/db");
const router = express.Router();
const userService = require("../services/userService");
const LoginRequestBody = require("./requests/loginUserRequestBody");

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
  const { email, password } = req.body;

  const loginRequestBody = new LoginRequestBody(email, password);

  const str = await userService.loginUser(loginRequestBody);
  res.status(200).json(str);
});

module.exports = router;
