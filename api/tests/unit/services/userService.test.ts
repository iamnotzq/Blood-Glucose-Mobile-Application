import * as bcrypt from "bcrypt";
import * as userService from "../../../services/userService";
import * as userRepo from "../../../repositories/userRepository"
import LoginRequestBody from "../../../routes/models/requests/requestBodies";
import { jest, describe, expect, it, afterAll, beforeAll, beforeEach, afterEach } from '@jest/globals';

jest.mock("bcrypt");
jest.mock("../../../repositories/userRepository");

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

        (bcrypt.hash as jest.Mock).mockImplementation(async () => hashedPassword);

        const result = await userService.hashPassword(unhashedPassword);

        expect(bcrypt.hash).toHaveBeenCalledWith(unhashedPassword, saltRounds);
        expect(result).toBe(hashedPassword);
    });

    it("Should throw an error if the password is undefined", async () => {
        const invalidPassword = undefined;

        await expect(
            userService.hashPassword(invalidPassword)
        ).rejects.toThrow("Password is invalid or undefined");
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
        const loginRequestBody: LoginRequestBody = { email: invalidEmail, password: validPassword };

        await expect(
            userService.validateUserLogin(loginRequestBody)
        ).rejects.toThrow("Email is invalid");
    });

    it("Should throw error when user does not exist", async () => {
        const loginRequestBody: LoginRequestBody = { email: validEmail, password: validPassword };

        await expect(
            userService.validateUserLogin(loginRequestBody)
        ).rejects.toThrow(
            `User with email: ${loginRequestBody.email} does not exist, try creating an account`
        );
    });

    it("Should throw error when pasword is invalid", async () => {
        (userRepo.userExists as jest.Mock).mockImplementation(async () => true);

        const loginRequestBody: LoginRequestBody = {
            email: validEmail,
            password: invalidPassword,
        };

        await expect(
            userService.validateUserLogin(loginRequestBody)
        ).rejects.toThrow("Password is invalid");
        expect(userRepo.userExists).toHaveBeenCalledWith(validEmail);
    });

    it("Should throw error when paswords do not match is invalid", async () => {
        (userRepo.userExists as jest.Mock).mockImplementation(async () => true);
        (userRepo.getUserHashedPassword as jest.Mock).mockImplementation(async () =>
            "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6"
        );

        const wrongPassword = "WrongPass1*";
        const loginRequestBody: LoginRequestBody = {
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
            firstName: "John",
            lastName: "Doe",
            country: "Singapore",
            age: 25,
            gender: "M",
            weightKg: 65,
            heightCm: 170,
            diabetesType: "Type 1",
            medicationList: [],
            caloricGoalKcal: 2000,
            hyperMgDl: 180,
            hypoMgDl: 70,
            targetLowerMgDl: 80,
            targetUpperMgDl: 130,
        };

        await expect(
            userService.createUser(invalidUser as any)
        ).rejects.toThrow("Email is invalid");
    });

    it("Should throw error if user exists", async () => {
        (userRepo.userExists as jest.Mock).mockImplementation(async () => true);

        const invalidUser = {
            username: "johndoe001",
            email: validEmail,
            password: validPassword,
            firstName: "John",
            lastName: "Doe",
            country: "Singapore",
            age: 25,
            gender: "M",
            weightKg: 65,
            heightCm: 170,
            diabetesType: "Type 1",
            medicationList: [],
            caloricGoalKcal: 2000,
            hyperMgDl: 180,
            hypoMgDl: 70,
            targetLowerMgDl: 80,
            targetUpperMgDl: 130,
        };

        await expect(
            userService.createUser(invalidUser as any)
        ).rejects.toThrow(
            `User with email: ${invalidUser.email} already exists, try logging in`
        );
    });

    it("Should throw error if the password is invalid", async () => {
        (userRepo.userExists as jest.Mock).mockImplementation(async () => false);

        const invalidUser = {
            username: "johndoe001",
            email: validEmail,
            password: invalidPassword,
            firstName: "John",
            lastName: "Doe",
            country: "Singapore",
            age: 25,
            gender: "M",
            weightKg: 65,
            heightCm: 170,
            diabetesType: "Type 1",
            medicationList: [],
            caloricGoalKcal: 2000,
            hyperMgDl: 180,
            hypoMgDl: 70,
            targetLowerMgDl: 80,
            targetUpperMgDl: 130,
        };

        await expect(
            userService.createUser(invalidUser as any)
        ).rejects.toThrow("Password is invalid");
    });

    it("Should have a defined userId if the user does not exist", async () => {
        (userRepo.userExists as jest.Mock).mockImplementation(async () => false);

        const validUser = {
            username: "johndoe001",
            email: validEmail,
            password: validPassword,
            firstName: "John",
            lastName: "Doe",
            country: "Singapore",
            age: 25,
            gender: "M",
            weightKg: 65,
            heightCm: 170,
            diabetesType: "Type 1",
            medicationList: [],
            caloricGoalKcal: 2000,
            hyperMgDl: 180,
            hypoMgDl: 70,
            targetLowerMgDl: 80,
            targetUpperMgDl: 130,
        };

        const email = validUser.email;
        const unhashedPassword = validUser.password;
        const hashedPassword =
            "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";
        const saltRounds = 10;

        (bcrypt.hash as jest.Mock).mockImplementation(async () => hashedPassword);
        (bcrypt.compare as jest.Mock).mockImplementation(async () => true);

        const userId = await userService.createUser(validUser as any);

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
        jest
            .spyOn(userService, "validateUserLogin")
            .mockResolvedValue(false);

        const loginRequestBody: LoginRequestBody = {
            email: invalidEmail,
            password: invalidPassword,
        };

        await expect(
            userService.loginUser(loginRequestBody)
        ).rejects.toThrow(
            "Login failed. Please check your credentials and try again."
        );
    });

    it('should return "User has logged in" when user is valid', async () => {
        (userRepo.userExists as jest.Mock).mockImplementation(async () => true);
        const hashedPassword =
            "$2b$10$N8BwaJVClbzPwnPmon8cbONSG/8Qfg57etVTRxpePXyEMM8A/76E6";

        (bcrypt.hash as jest.Mock).mockImplementation(async () => hashedPassword);

        jest
            .spyOn(userService, "validateUserLogin")
            .mockResolvedValue(true);

        const loginRequestBody: LoginRequestBody = {
            email: validEmail,
            password: validPassword,
        };

        const result = await userService.loginUser(
            loginRequestBody
        );

        expect(result).toBe("User has logged in");
        expect(bcrypt.compare).toHaveBeenCalledWith(
            loginRequestBody.password,
            hashedPassword
        );
    });
});
