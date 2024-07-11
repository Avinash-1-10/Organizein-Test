import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CustomError } from "../utils/customError.js";
import { matchPassword } from "../utils/matchPassword.js";
import generateToken from "../utils/generateToken.js";
import setCookies from "../utils/setCookies.js";

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body; // Destructuring the request body to get user details

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return next(new CustomError("All fields are required", 400)); // Return error if any field is missing
  }

  // Check if the user already exists with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new CustomError("User already exists", 409)); // Return error if user already exists
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating a new user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Return success response with the created user data
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("All fields are required", 400));
  }

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    return next(new CustomError("User does not exist", 404));
  }

  const isMatch = await matchPassword(password, existingUser.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  // Generate JWT token
  const token = generateToken(existingUser._id);

  // Set cookies
  setCookies(res, token);

  const loggedInUser = await User.findById(existingUser._id).select(
    "-password"
  );

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: loggedInUser,
      auth_token: token,
    })
  );
});

export { register };
