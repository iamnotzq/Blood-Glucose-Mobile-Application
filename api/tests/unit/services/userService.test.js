const bcrypt = require("bcrypt");
const userService = require("../../../services/userService");
const userRepo = require("../../../repository/userRepository");
const User = require("../../../models/user");
const { fakeUser1 } = require("../sharedFakes");
const { ObjectId } = require("mongodb");

jest.mock("bcrypt");
jest.mock("../../../repository/userRepository");

describe("validateEmail", () => {
  it("Should throw error when email is empty", () => {
    const emptyEmail = "";
    const undefinedEmail = undefined;

    const result1 = userService.validateEmail(emptyEmail);
    const result2 = userService.validateEmail(undefinedEmail);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("Should throw error when email is invalid", () => {
    const invalidEmail = "invalid";

    const result = userService.validateEmail(invalidEmail);

    expect(result).toBe(false);
  });

  it("Should return true if the email is valid", () => {
    const validEmail = "fake@email.com";

    const result = userService.validateEmail(validEmail);

    expect(result).toBe(true);
  });
});

describe("validatePassword", () => {
  it("Should return false if password is empty or null", () => {
    const emptyPassword = "";
    const undefinedPassword = undefined;

    const result1 = userService.validatePassword(emptyPassword);
    const result2 = userService.validatePassword(undefinedPassword);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("Should return false if password length is not valid", () => {
    const invalidPassword = "1234a";
    const result = userService.validatePassword(invalidPassword);

    expect(result).toBe(false);
  });

  it("Should return false if password does not contain alphanumeric characters", () => {
    const invalidPassword = "________";
    const result = userService.validatePassword(invalidPassword);

    expect(result).toBe(false);
  });

  it("Should return false if password contains special characters", () => {
    const invalidPassword = "12345acbde";
    const result = userService.validatePassword(invalidPassword);

    expect(result).toBe(false);
  });

  it("Should return true is password is valid", () => {
    const validPassword = "1234aBce*";

    const result = userService.validatePassword(validPassword);

    expect(result).toBe(true);
  });
});

describe("hashPassword", () => {
  it("Should return a hashed password if the unhashed password is valid", async () => {
    const unhashedPassword = "fake-password";
    const saltRounds = 10;
    const hashedPassword =
      "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";

    bcrypt.hash.mockResolvedValue(hashedPassword);

    const result = await userService.hashPassword(unhashedPassword);

    expect(bcrypt.hash).toHaveBeenCalledWith(unhashedPassword, saltRounds);
    expect(result).toBe(hashedPassword);
  });

  it("Should throw an error if the password is null", async () => {
    const invalidPassword = null;

    await expect(userService.hashPassword(invalidPassword)).rejects.toThrow(
      "Password is invalid or undefined"
    );
  });
});

describe("validateUserLogin", () => {
  const validEmail = "valid@email.com";
  const invalidEmail = "invalid";
  const validPassword = "Password123*";
  const invalidPassword = "";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw error when email is invalid", async () => {
    const loginRequestBody = { email: invalidEmail, password: validPassword };

    await expect(
      userService.validateUserLogin(loginRequestBody)
    ).rejects.toThrow("Email is invalid");
  });

  it("Should throw error when user does not exist", async () => {
    const loginRequestBody = { email: validEmail, password: validPassword };

    await expect(
      userService.validateUserLogin(loginRequestBody)
    ).rejects.toThrow(
      `User with email: ${loginRequestBody.email} does not exist, try creating an account`
    );
  });

  it("Should throw error when pasword is invalid", async () => {
    userRepo.userExists.mockResolvedValue(true);

    const loginRequestBody = {
      email: validEmail,
      password: invalidPassword,
    };

    await expect(
      userService.validateUserLogin(loginRequestBody)
    ).rejects.toThrow("Password is invalid");
    expect(userRepo.userExists).toHaveBeenCalledWith(validEmail);
  });

  it("Should throw error when paswords do not match is invalid", async () => {
    userRepo.userExists.mockResolvedValue(true);
    userRepo.getUserHashedPassword.mockResolvedValue(
      "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6"
    );

    const wrongPassword = "WrongPass1*";
    const loginRequestBody = {
      email: validEmail,
      password: wrongPassword,
    };

    await expect(
      userService.validateUserLogin(loginRequestBody)
    ).rejects.toThrow("Passwords do not match, try again");
    expect(userRepo.userExists).toHaveBeenCalledWith(validEmail);
    expect(userRepo.getUserHashedPassword).toHaveBeenCalledWith(validEmail);
  });
});

describe("createUser", () => {
  const validEmail = "valid@email.com";
  const invalidEmail = "invalid";
  const validPassword = "Password123*";
  const invalidPassword = "";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw error when email is invalid", async () => {
    const invalidUser = {
      username: "johndoe001",
      email: invalidEmail,
      password: validPassword,
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

    await expect(userService.createUser(invalidUser)).rejects.toThrow(
      "Email is invalid"
    );
  });

  it("Should throw error if user exists", async () => {
    userRepo.userExists.mockResolvedValue(true);

    const invalidUser = {
      username: "johndoe001",
      email: validEmail,
      password: validPassword,
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

    await expect(userService.createUser(invalidUser)).rejects.toThrow(
      `User with email: ${invalidUser.email} already exists, try logging in`
    );
  });

  it("Should throw error if the password is invalid", async () => {
    userRepo.userExists.mockResolvedValue(false);

    const invalidUser = {
      username: "johndoe001",
      email: validEmail,
      password: invalidPassword,
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

    await expect(userService.createUser(invalidUser)).rejects.toThrow(
      "Password is invalid"
    );
  });

  it("Should have a defined userId if the user does not exist", async () => {
    userRepo.userExists.mockResolvedValue(false);

    const validUser = {
      username: "johndoe001",
      email: validEmail,
      password: validPassword,
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

    const email = validUser.email;
    const unhashedPassword = validUser.password;
    const hashedPassword =
      "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";
    const saltRounds = 10;

    bcrypt.hash.mockResolvedValue(hashedPassword);
    bcrypt.compare.mockResolvedValue(true);

    const userId = await userService.createUser(validUser);

    expect(userRepo.userExists).toHaveBeenCalledWith(email);
    expect(bcrypt.hash).toHaveBeenCalledWith(unhashedPassword, saltRounds);
    expect(userRepo.saveUser).toHaveBeenCalled();
    expect(userId).toBeDefined();
  });
});

describe("loginUser", () => {
  const validEmail = "valid@email.com";
  const invalidEmail = "invalid";
  const validPassword = "Password123*";
  const invalidPassword = "";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error message when user is invalid", async () => {
    jest.spyOn(userService, "validateUserLogin").mockResolvedValue(false);

    const loginRequestBody = {
      email: invalidEmail,
      password: invalidPassword,
    };

    await expect(userService.loginUser(loginRequestBody)).rejects.toThrow(
      "Login failed. Please check your credentials and try again."
    );
  });

  it('should return "User has logged in" when user is valid', async () => {
    userRepo.userExists.mockResolvedValue(true);
    const hashedPassword =
      "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";

    bcrypt.hash.mockResolvedValue(hashedPassword);

    jest.spyOn(userService, "validateUserLogin").mockResolvedValue(true);

    const loginRequestBody = {
      email: validEmail,
      password: validPassword,
    };

    const result = await userService.loginUser(loginRequestBody);

    expect(result).toBe("User has logged in");
    expect(bcrypt.compare).toHaveBeenCalledWith(
      loginRequestBody.password,
      hashedPassword
    );
  });
});
