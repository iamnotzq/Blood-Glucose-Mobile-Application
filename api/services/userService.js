const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRepository = require("../repository/userRepository");

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

  await newUser.save();

  return newUser._id;
};

module.exports = {
  hashPassword,
  createUser,
};
