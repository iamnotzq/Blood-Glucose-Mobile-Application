const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../../models/user");
const userRepository = require("../../../repository/userRepository");
require("dotenv").config();
const { fakeUser1 } = require("../sharedFakes");

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const uri = process.env.MONGO_URI;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 15000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("userExists", () => {
  beforeEach(async () => {
    const user1 = new User(fakeUser1);
    await user1.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  }, 10000);

  it("Should return true if the email exists", async () => {
    const existingEmail = fakeUser1.email;
    const result = await userRepository.userExists(existingEmail);
    expect(result).toBe(true);
  });

  it("Should return false if the email does not exist", async () => {
    const nonExistingEmail = "new-fake@email.com";
    const result = await userRepository.userExists(nonExistingEmail);
    expect(result).toBe(false);
  });

  it("Should throw error for invalid email", async () => {
    const invalidEmail = "invalid";

    await expect(userRepository.userExists(invalidEmail)).rejects.toThrow(
      "Invalid Email"
    );
  });
});
