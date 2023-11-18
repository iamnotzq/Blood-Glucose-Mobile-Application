const User = require("../models/user");
const userRepository = require("../repository/userRepository");

const createUser = async (userData) => {
  const email = userData.email;
  const userExists = await userRepository.userExists(email);

  if (userExists) {
    throw new Error(`User with email ${email} already exists`);
  }

  const newUser = new User(userData);
  await newUser.save();

  return newUser._id;
};

module.exports = {
  createUser,
};
