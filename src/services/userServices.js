import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const create = async ({ name, email, password }) => {
  /* Checks if email is already signed up */
  const { rowCount: isDuplicate } = await userRepository.findByEmail(email);
  if (isDuplicate) {
    const error = new Error("Email already signed up.");
    error.statusCode = 409;
    throw error;
  }

  /* Creates user's account */
  const hashPassword = await bcrypt.hash(password, 10);
  await userRepository.create({ name, email, password: hashPassword });
};

const signIn = async ({ email, password }) => {
  const {
    rows: [user],
  } = await userRepository.findByEmail(email);

  const passwordsMatched = bcrypt.compareSync(password, user?.password || "");

  if (!passwordsMatched) {
    const error = new Error("Incorrent email or password.");
    error.statusCode = 401;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    token: jwt.sign({ id: user.id }, process.env.SECRET),
  };
};

export default { create, signIn };
