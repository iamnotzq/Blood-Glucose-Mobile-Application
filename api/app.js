const express = require("express");
require("dotenv").config();
require("./models/db");

const app = express();
const userService = require("./services/userService");

const fakeUser = {
  username: "johndoe001",
  email: "johndoe001@email.com",
  password: "fakePassword",
  first_name: "John",
  last_name: "Doe",
  country: "Singapore",
  age: 25,
  gender: "M",
  weight_kg: 65,
  height_cm: 170,
  diabetes_type: "Type 1",
  medication_list: [],
  caloric_goal_kcal: 2000,
  hyper_mg_dl: 180,
  hypo_mg_dl: 70,
  target_lower_mg_dl: 80,
  target_upper_mg_dl: 130,
};

app.post("/create-user", async (req, res) => {
  try {
    // TODO - Replace with dynamic data
    const user = await userService.createUser(fakeUser);
    res.json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    // TODO - Add proper status and message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Port is listening");
});
