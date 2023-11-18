const userService = require("../../../services/userService");
const userRepo = require("../../../repository/userRepository");
const User = require("../../../models/user");
const { fakeUser1 } = require("../sharedFakes");

jest.mock("../../../repository/userRepository");

describe("createUser", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Should have a defined userId if the user does not exist", async () => {
    userRepo.userExists.mockResolvedValue(false);

    const saveMock = jest.fn();
    jest.spyOn(User.prototype, "save").mockImplementation(saveMock);

    const userId = await userService.createUser(fakeUser1);

    expect(userRepo.userExists).toHaveBeenCalledWith(fakeUser1.email);
    expect(saveMock).toHaveBeenCalled();
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
