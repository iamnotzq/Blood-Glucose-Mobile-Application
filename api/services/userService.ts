import * as bcrypt from "bcrypt";
import User, { UserDocument } from "../repositories/models/user";
import * as userRepository from "../repositories/userRepository";
import {
  CreateUserRequestBody,
  LoginRequestBody,
  NewUserRequestBody,
} from "../routes/models/requests/requestBodies";
import { GetUserGlucoseLevelsResponseBody } from "../routes/models/responses/responseBodies";
import { NewUserResponseBody } from "../routes/models/responses/responseBodies";

// helper functions
// TODO add error message
const validateEmail = (maybeEmail?: string): boolean => {
  if (!maybeEmail || maybeEmail === "") {
    return false;
  }

  const maybeEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return maybeEmailRegex.test(maybeEmail);
};

// TODO add error message
const validatePassword = (password?: string): boolean => {
  if (!password) {
    return false;
  } else if (password.length < 8 || password.length > 16) {
    return false;
  } else if (!/[a-zA-Z0-9]/.test(password)) {
    return false;
  } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return false;
  }

  return true;
};

const hashPassword = async (password?: string): Promise<string> => {
  if (!password) throw new Error("Password is invalid or undefined");

  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export const validateNewUser = async (
  requestBody: NewUserRequestBody
): Promise<NewUserResponseBody> => {
  const { username, email, password, confirmPassword } = requestBody;

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return {
      isValid: false,
      status: 409,
      message: `User with username: ${username} already exists`,
    };
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return {
      isValid: false,
      status: 409,
      message: `User with email: ${email} already exists`,
    };
  }

  const passwordIsValid = validatePassword(password);

  if (!passwordIsValid) {
    return {
      isValid: false,
      status: 409,
      message: `Password is invalid`,
    };
  }

  const passwordsMatch = password === confirmPassword ? true : false;
  if (!passwordsMatch) {
    return {
      isValid: false,
      status: 409,
      message: `Passwords do not match`,
    };
  }

  return {
    isValid: true,
    status: 200,
    message: `New user is valid`,
  };
};

const validateUserLogin = async (
  loginRequestBody: LoginRequestBody
): Promise<boolean> => {
  const { email, password } = loginRequestBody;

  const maybeEmailIsValid = validateEmail(email);
  if (!maybeEmailIsValid) throw new Error("Email is invalid");

  const userExists = await userRepository.userExists(email);
  if (!userExists)
    throw new Error(
      `User with email: ${email} does not exist, try creating an account`
    );

  const passwordIsValid = validatePassword(password);
  if (!passwordIsValid) throw new Error("Password is invalid");

  const hashedPassword = await userRepository.getUserHashedPassword(email);

  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordsMatch) throw new Error("Passwords do not match, try again");

  return true;
};

const createUser = async (userData: CreateUserRequestBody): Promise<string> => {
  const maybeEmail = userData.email;
  const maybeEmailIsValid = validateEmail(maybeEmail);
  if (!maybeEmailIsValid) throw new Error("Email is invalid");

  const userExists = await userRepository.userExists(maybeEmail);
  if (userExists) {
    throw new Error(
      `User with email: ${maybeEmail} already exists, try logging in`
    );
  }

  const initialPassword = userData.password;
  const passwordIsValid = validatePassword(initialPassword);
  if (!passwordIsValid) throw new Error("Password is invalid");

  const hashedPassword = await hashPassword(initialPassword);
  userData.password = hashedPassword;

  const newUser = new User(userData);

  await userRepository.saveUser(newUser);

  return newUser._id;
};

const loginUser = async (
  loginRequestBody: LoginRequestBody
): Promise<string> => {
  try {
    const userIsValid = await validateUserLogin(loginRequestBody);

    if (!userIsValid) {
      return "Validation failed";
    }

    const email = loginRequestBody.email;
    const user: UserDocument = await User.findOne({ email });
    const userId = user.id;

    return userId;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Error in logging in");
  }
};

export const getUserGlucoseRange = async (
  id: string
): Promise<GetUserGlucoseLevelsResponseBody> => {
  try {
    const user: UserDocument | null = await User.findOne({ _id: id });
    const lowerLevel = user.targetLowerMgDl;
    const upperLevel = user.targetUpperMgDl;

    const responseBody = {
      lowerLevel: lowerLevel,
      upperLevel: upperLevel,
    };
    return responseBody;
  } catch (error: any) {
    throw new Error(`Error in getUserGlucoseRange: ${error}`);
  }
};

export {
  validateEmail,
  validatePassword,
  hashPassword,
  createUser,
  loginUser,
  validateUserLogin,
};
