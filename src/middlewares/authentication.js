import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authentication = (req, res, next) => {
  const token = req.header("authorization")?.replace(/(Bearer )/g, "");
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    res.locals.session = id;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

export default authentication;
