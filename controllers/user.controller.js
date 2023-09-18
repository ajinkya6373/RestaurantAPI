import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const signup = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email is already in use.");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      email: userData.email,
      password: hashedPassword,
      profilePictureURL: userData.profilePictureURL || "",
      username: userData.username || "",
      nickname: userData.nickname || "",
      phoneNumber: userData.phoneNumber,
      address: userData.address,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};


export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found. Please check your email and password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password. Please try again.");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
