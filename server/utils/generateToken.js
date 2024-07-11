import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const generateToken = (id) => {
  // Payload data you want to include in the token
  const payload = {
    id: id,
  };

  // Options for the token (optional)
  const options = {
    // generaate token for 1 day
    expiresIn: "1d",
  };

  // Generate the token using the secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};

export default generateToken;
