const User = require("../models/user");

const createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

module.exports = {
    createUser,
};