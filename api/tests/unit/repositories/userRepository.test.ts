import { config } from "dotenv";
config();
import {
  jest,
  describe,
  expect,
  it,
  afterAll,
  beforeAll,
  beforeEach,
  afterEach,
} from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User, { UserDocument } from "../../../repositories/models/user";
import {
  userExists,
  saveUser,
  getUserHashedPassword,
} from "../../../repositories/userRepository";

let mongoServer: MongoMemoryServer;

const fakeUser = {
  username: "john_doe",
  email: "john.doe@example.com",
  password: "password123",
  firstName: "John",
  lastName: "Doe",
  country: "USA",
  age: 30,
  gender: "Male",
  weightKg: 70,
  heightCm: 180,
  diabetesType: "Type1",
  medicationList: ["Insulin"],
  caloricGoalKcal: 2000,
  hyperMgDl: 180,
  hypoMgDl: 70,
  targetLowerMgDl: 80,
  targetUpperMgDl: 120,
};

beforeAll(async () => {
  console.log("Starting userRepository.test.ts");
  mongoServer = new MongoMemoryServer();
  const uri = process.env.MONGO_URI as string;
  await mongoose.connect(uri);
}, 20000);

beforeEach(async () => {
  const user1: UserDocument = new User(fakeUser);
  await user1.save();
});

afterEach(async () => {
  await User.deleteMany({});
}, 10000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();

  console.log("Completed userRepository.test.ts");
});

describe("userExists", () => {
  it("Should return true if the email exists", async () => {
    const existingEmail = fakeUser.email;
    const result = await userExists(existingEmail);
    expect(result).toBe(true);
  });

  it("Should return false if the email does not exist", async () => {
    const nonExistingEmail = "new-fake@email.com";
    const result = await userExists(nonExistingEmail);
    expect(result).toBe(false);
  });

  it("Should throw error for invalid email", async () => {
    const invalidEmail = "invalid";

    await expect(userExists(invalidEmail)).rejects.toThrow("Invalid Email");
  });
});

describe("saveUser", () => {
  const userObject = new User(fakeUser);

  it("Should return a userId when the user is created", async () => {
    const userId = await saveUser(userObject);

    expect(userId).toBeDefined();
  });
});

describe("getUserHashedPassword", () => {
  it("Should return a hashed password for an existing user", async () => {
    const email = fakeUser.email;
    const user = (await User.findOne({ email })) as UserDocument;
    const hashedPassword = user.password;

    const result = await getUserHashedPassword(email);

    expect(result).toBe(hashedPassword);
  });
});
