const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../../../routes/userRoutes");
const { fakeUser1 } = require("../sharedFakes");

jest.mock("../../../services/userService");

const testApp = express();
testApp.use(express.json());
testApp.use("", userRoutes);

describe("userRoutes", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  }, 20000);

  it("POST /api/create-user should create a new user and return user ID", async () => {
    const userService = require("../../../services/userService");
    const mockCreateUser = jest.fn().mockResolvedValue("mockedUserId");
    userService.createUser = mockCreateUser;

    const response = await request(testApp)
      .post("/api/create-user")
      .send(fakeUser1);

    expect(response.status).toBe(200);
    expect(response.body).toBe("mockedUserId");
    expect(mockCreateUser).toHaveBeenCalledWith({
      age: 25,
      caloric_goal_kcal: 2000,
      country: "Singapore",
      diabetes_type: "Type 1",
      email: "fake@email.com",
      first_name: "John",
      gender: "M",
      height_cm: 170,
      hyper_mg_dl: 180,
      hypo_mg_dl: 70,
      last_name: "Doe",
      medication_list: [],
      password: "fakePassword**",
      target_lower_mg_dl: 80,
      target_upper_mg_dl: 130,
      username: "johndoe001",
      weight_kg: 65,
    });
  });

  it("POST /api/create-user should throw 500 error when a user with the same email exists", async () => {
    require("../../../services/userService").createUser.mockRejectedValue(
      new Error("Mocked error")
    );

    const response = await request(testApp)
      .post("/api/create-user")
      .send(fakeUser1);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });

  it("POST /api/login should login user", async () => {
    const userService = require("../../../services/userService");
    const expectedResponse = "User has logged in";
    const mockLoginUser = jest.fn().mockResolvedValue(expectedResponse);
    userService.loginUser = mockLoginUser;

    const invalidLoginRequestBody = {
      email: "fake@email.com",
      password: "Password123*",
    };

    const response = await request(testApp)
      .post("/api/login")
      .send(invalidLoginRequestBody);

    expect(response.status).toBe(200);
    expect(response.body).toBe(expectedResponse);
    expect(mockLoginUser).toHaveBeenCalledWith(invalidLoginRequestBody);
  });

  it("POST /api/login should throw 500 error when invalidLoginRequestBody is invalid", async () => {
    require("../../../services/userService").loginUser.mockRejectedValue(
      new Error("Mocked error")
    );

    const invalidLoginRequestBody = {
      email: "invalid",
      password: "",
    };

    const response = await request(testApp)
      .post("/api/login")
      .send(invalidLoginRequestBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual("Login failed");
  });
});
