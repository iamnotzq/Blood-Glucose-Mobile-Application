import * as bcrypt from "bcrypt";
import User, { UserDocument } from "../repositories/models/user";
import * as userRepository from "../repositories/userRepository";
import { LoginRequestBody } from "../routes/models/requests/loginUserRequestBody";
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

const createUser = async (userData: any): Promise<string> => {
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

export {
  validateEmail,
  validatePassword,
  hashPassword,
  createUser,
  loginUser,
  validateUserLogin,
};
