import jwt from "jsonwebtoken";
const verifyToken = async(token)=> {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  export default verifyToken;