const User = require("../models/user");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userExists = async (email) => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid Email");
  }

  const existingUser = await User.findOne({ email });

  return !!existingUser;
};

const saveUser = async (newUser) => {
  await newUser.save();

  return newUser._id;
};

const getUserHashedPassword = async (email) => {
  const user = await User.findOne({ email });
  const hashedPassword = user.password;

  return hashedPassword;
};

module.exports = {
  userExists,
  saveUser,
  getUserHashedPassword,
};
