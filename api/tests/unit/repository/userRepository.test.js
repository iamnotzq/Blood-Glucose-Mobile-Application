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
}, 20000);

beforeEach(async () => {
  const user1 = new User(fakeUser1);
  await user1.save();
});

afterEach(async () => {
  await User.deleteMany({});
}, 10000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("userExists", () => {
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

describe("saveUser", () => {
  const userObject = new User(fakeUser1);

  it("Should return a userId when the user is created", async () => {
    const userId = await userRepository.saveUser(userObject);

    expect(userId).toBeDefined();
  });
});

describe("getUserHashedPassword", () => {
  it("Should return a hashed password for an existing user", async () => {
    const email = fakeUser1.email;
    const user = await User.findOne({ email });
    const hashedPassword = user.password;

    const result = await userRepository.getUserHashedPassword(email);

    expect(result).toBe(hashedPassword);
  });
});
