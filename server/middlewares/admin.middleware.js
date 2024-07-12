import { CustomError } from "../utils/customError.js";

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send(new CustomError("You are not an admin", 401));
  }
};
export default adminMiddleware;
