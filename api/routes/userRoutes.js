const express = require("express");
require("dotenv").config();
require("../models/db");
const router = express.Router();
const userService = require("../services/userService");

router.post("/api/create-user", async (req, res) => {
  try {
    // TODO - Replace with dynamic data
    const newUserId = await userService.createUser(req.body);
    res.status(200).json(newUserId);
  } catch (err) {
    console.error("Error creating user:", err);
    // TODO - Add proper status and message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
