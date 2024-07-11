import { CustomError } from "../utils/customError.js";
import jwt from "jsonwebtoken";
import verifyToken from "../utils/verifyToken.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  // console.log(req.cookies)
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      throw new CustomError("Authentication required", 401);
    }

    // Verify the token using a separate async function
    const decoded = await verifyToken(token);
    const userId = decoded.id;
    if (!userId)
      throw new CustomError("Authentication required- invalid token", 401);
    const user = await User.findById(userId);
    if (!user)
      throw new CustomError("Authentication required- user not found", 401);
    req.user = user;
    next();
  } catch (error) {
    // Handle JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      console.error("JWT expired:", error.message); // Log for debugging
      return res.status(401).json(new CustomError("Token expired", 401));
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT verification error:", error.message); // Log for debugging
      return res.status(401).json(new CustomError("Invalid token", 401));
    } else {
      // Handle other errors
      console.error("Internal server error:", error.message); // Log for debugging
      return res
        .status(500)
        .json(new CustomError("Internal Server Error", 500));
    }
  }
};

export default authMiddleware;
