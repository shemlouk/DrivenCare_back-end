import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

const create = async ({ name, email, password }) => {
  const { rowCount: isDuplicate } = await userRepository.findByEmail(email);
  if (isDuplicate) {
    const error = new Error("Email already signed up");
    error.statusCode = 409;
    throw error;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await userRepository.create({ name, email, password: hashPassword });
};

export default { create };
