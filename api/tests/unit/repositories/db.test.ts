import { config } from "dotenv";
config();
import mongoose from "mongoose";
import * as database from "../../../repositories/database"
import { jest, describe, it, expect } from "@jest/globals"

jest.mock("mongoose");

describe("Database Connection", () => {
    it("Should connect to the database", async () => {
        const connectSpy = jest.spyOn(mongoose, "connect");

        await database.connectToDatabase();

        expect(connectSpy).toHaveBeenCalledWith(
            process.env.MONGO_URI as string
        );
    });
});
