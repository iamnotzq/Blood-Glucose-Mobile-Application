import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "../../../routes/userRoutes";
import { jest, describe, expect, it, afterAll } from '@jest/globals';

jest.mock("../../../services/userService");

const testApp = express();
testApp.use(express.json());
testApp.use("", userRoutes);

const fakeUser = {
    age: 25,
    caloricGoalKcal: 2000,
    country: "Singapore",
    diabetesType: "Type 1",
    email: "fake@email.com",
    firstName: "John",
    gender: "M",
    heightCm: 170,
    hyperMgDl: 180,
    hypoMgDl: 70,
    lastName: "Doe",
    medicationList: [],
    password: "fakePassword**",
    targetLowerMgDl: 80,
    targetUpperMgDl: 130,
    username: "johndoe001",
    weightKg: 65,
}

describe("userRoutes", () => {
    afterAll(async () => {
        await mongoose.disconnect();
    }, 20000);

    it("POST /api/create-user should create a new user and return user ID", async () => {
        const userService = require("../../../services/userService");
        const mockCreateUser = jest.fn().mockImplementation(async () => "mockedUserId");
        userService.createUser = mockCreateUser;

        const response = await request(testApp)
            .post("/api/create-user")
            .send(fakeUser);

        expect(response.status).toBe(200);
        expect(response.body).toBe("mockedUserId");
        expect(mockCreateUser).toHaveBeenCalledWith({
            age: 25,
            caloricGoalKcal: 2000,
            country: "Singapore",
            diabetesType: "Type 1",
            email: "fake@email.com",
            firstName: "John",
            gender: "M",
            heightCm: 170,
            hyperMgDl: 180,
            hypoMgDl: 70,
            lastName: "Doe",
            medicationList: [],
            password: "fakePassword**",
            targetLowerMgDl: 80,
            targetUpperMgDl: 130,
            username: "johndoe001",
            weightKg: 65,
        });
    });

    it("POST /api/create-user should throw 500 error when a user with the same email exists", async () => {
        require("../../../services/userService").createUser.mockRejectedValue(
            new Error("Mocked error")
        );

        const response = await request(testApp)
            .post("/api/create-user")
            .send(fakeUser);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal Server Error" });
    });

    it("POST /api/login should login user", async () => {
        const userService = require("../../../services/userService");
        const expectedResponse = "User has logged in";
        const mockLoginUser = jest.fn().mockImplementation(async () => expectedResponse);
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
