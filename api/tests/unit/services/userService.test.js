const bcrypt = require("bcrypt");
const userService = require("../../../services/userService");
const userRepo = require("../../../repository/userRepository");
const User = require("../../../models/user");
const { fakeUser1 } = require("../sharedFakes");
const { ObjectId } = require("mongodb");

jest.mock("bcrypt");
jest.mock("../../../repository/userRepository");

describe("hashPassword", () => {
  it("Should returned a hashed password if the unhashed password is valid", async () => {
    const unhashedPassword = "fake-password";
    const saltRounds = 10;
    const hashedPasswordMock =
      "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";

    bcrypt.hash.mockResolvedValue(hashedPasswordMock);

    const result = await userService.hashPassword(unhashedPassword);

    expect(bcrypt.hash).toHaveBeenCalledWith(unhashedPassword, saltRounds);
    expect(result).toBe(hashedPasswordMock);
  });

  it("Should throw an error if the password is null", async () => {
    const invalidPassword = null;

    await expect(userService.hashPassword(invalidPassword)).rejects.toThrow(
      "Password is invalid or undefined"
    );
  });
});

describe("createUser", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Should have a defined userId if the user does not exist", async () => {
    userRepo.userExists.mockResolvedValue(false);

    const fakeInitialPassword = fakeUser1.password;
    const saltRounds = 10;
    const hashedPasswordMock =
      "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";

    bcrypt.hash.mockResolvedValue(hashedPasswordMock);

    const userId = await userService.createUser(fakeUser1);

    const userObject = new User(fakeUser1);

    expect(userRepo.userExists).toHaveBeenCalledWith(fakeUser1.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(fakeInitialPassword, saltRounds);
    expect(userRepo.saveUser).toHaveBeenCalled();
    expect(userId).toBeDefined();
  });

  it("Should throw error if the user exists", async () => {
    userRepo.userExists.mockResolvedValue(true);
    const existingEmail = fakeUser1.email;
    await expect(userService.createUser(fakeUser1)).rejects.toThrow(
      `User with email ${existingEmail} already exists`
    );
  });
});
