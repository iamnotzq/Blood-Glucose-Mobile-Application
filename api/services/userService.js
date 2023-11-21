const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRepository = require("../repository/userRepository");
const LoginRequestBody = require("../routes/requests/loginUserRequestBody");

// TODO Add rules for password
const hashPassword = async (password) => {
  if (!password) throw new Error("Password is invalid or undefined");

  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

const createUser = async (userData) => {
  const email = userData.email;
  const userExists = await userRepository.userExists(email);

  if (userExists) {
    throw new Error(`User with email ${email} already exists`);
  }

  const initialPassword = userData.password;
  const hashedPassword = await hashPassword(initialPassword);
  userData.password = hashedPassword;
  const newUser = new User(userData);

  await userRepository.saveUser(newUser);

  return newUser._id;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

const validateUserLogin = async (loginRequestBody) => {
  const { email, password } = loginRequestBody;

  const emailIsValid = validateEmail(email);
  if (!emailIsValid) throw new Error("Invalid email format, try again");

  const userExists = await userRepository.userExists(email);
  if (!userExists)
    throw new Error(`User with email: ${email} does not exist, try login`);

  const passwordIsValid = validatePassword(password);
  if (!passwordIsValid) throw new Error("Invalid password format, try again");

  const hashedPassword = await userRepository.getUserHashedPassword(email);

  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordsMatch) throw new Error("Passwords do not match, try again");

  return true;
};
const loginUser = async (loginRequestBody) => {
  return await validateUserLogin(loginRequestBody);
};

module.exports = {
  hashPassword,
  createUser,
  loginUser,
};
