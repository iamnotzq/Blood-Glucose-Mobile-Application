import request from "supertest";
import express, { response } from "express";
import mongoose from "mongoose";
import * as dashboardService from "../../../services/dashboardService";
import dashboardRoutes from "../../../routes/dashboardRoutes";
import {
  jest,
  describe,
  expect,
  afterAll,
  afterEach,
  test,
  beforeEach,
} from "@jest/globals";
import { fakeDashboardAssets } from "./fakes";

jest.mock("../../.././repositories/database");
jest.mock("../../../services/dashboardService");

const testApp = express();
testApp.use(express.json());
testApp.use("", dashboardRoutes);

describe("dashboardRoutes", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  }, 20000);

  describe("/api/dashboard/:user_id", () => {
    const fakeUserId = "656aed89594fc49ef5cac032";

    test("Should return 200 with dashboard assets", async () => {
      const url = `/api/dashboard/${fakeUserId}`;

      jest
        .spyOn(dashboardService, "getDashboardAssets")
        .mockResolvedValue(fakeDashboardAssets);

      const expected = fakeDashboardAssets;

      const response = await request(testApp).get(url);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(expected);
    });

    test("Should handle errors", async () => {
      const invalidUserId = "invalid";
      const url = `/api/dashboard/${invalidUserId}`;

      const mockErrorMessage = `Error retrieving dashboard assets for user ${invalidUserId}`;
      const mockError = new Error(mockErrorMessage);

      jest
        .spyOn(dashboardService, "getDashboardAssets")
        .mockRejectedValue(async () => {
          throw mockError;
        });

      const response = await request(testApp).get(url);

      expect(response.status).toBe(500);
      expect(response.body).toEqual(
        `Error retrieving dashboard assets for user ${invalidUserId}`
      );
    }, 10000);
  });
});
