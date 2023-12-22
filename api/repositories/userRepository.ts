import User, { UserDocument } from "./models/user";
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userExists = async (email: string): Promise<boolean> => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid Email");
  }

  const existingUser: UserDocument | null = await User.findOne({ email });

  return !!existingUser;
};

const saveUser = async (newUser: UserDocument): Promise<string> => {
  await newUser.save();

  return newUser._id.toString();
};

const getUserHashedPassword = async (email: string): Promise<string> => {
  const user = await User.findOne({ email });
  const hashedPassword = user?.password || "";

  return hashedPassword;
};

export { userExists, saveUser, getUserHashedPassword };
