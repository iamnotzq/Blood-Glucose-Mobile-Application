const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRepository = require("../repository/userRepository");
const LoginRequestBody = require("../routes/models/requests/loginUserRequestBody");

// helper functions
// TODO add error message
const validateEmail = (email) => {
  if (!email || email === "") {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

// TODO add error message
const validatePassword = (password) => {
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

const hashPassword = async (password) => {
  if (!password) throw new Error("Password is invalid or undefined");

  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

const validateUserLogin = async (loginRequestBody) => {
  const { email, password } = loginRequestBody;

  const emailIsValid = validateEmail(email);
  if (!emailIsValid) throw new Error("Email is invalid");

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

// main functions
const createUser = async (userData) => {
  const email = userData.email;
  const emailIsValid = validateEmail(email);
  if (!emailIsValid) throw new Error("Email is invalid");

  const userExists = await userRepository.userExists(email);
  if (userExists) {
    throw new Error(`User with email: ${email} already exists, try logging in`);
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

const loginUser = async (loginRequestBody) => {
  try {
    await validateUserLogin(loginRequestBody);

    return "User has logged in";
  } catch (error) {
    console.error(error.message);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  hashPassword,
  createUser,
  loginUser,
  validateUserLogin,
};
