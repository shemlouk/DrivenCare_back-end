import specialtyRepository from "../repositories/specialtyRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const create = async ({ name, email, password, specialty }) => {
  /* Checks if email is already signed up */
  const { rowCount: isDuplicate } = await doctorRepository.findByEmail(email);
  if (isDuplicate) {
    const error = new Error("Email already signed up.");
    error.statusCode = 409;
    throw error;
  }

  /* Checks if specialty exists in database */
  const { rowCount: specialtyExists } = await specialtyRepository.findById(
    specialty
  );
  if (!specialtyExists) {
    const error = new Error("Specialty does not exists.");
    error.statusCode = 422;
    throw error;
  }

  /* Creates doctor's account */
  const hashPassword = await bcrypt.hash(password, 10);
  await doctorRepository.create({
    name,
    email,
    specialty,
    password: hashPassword,
  });
};

const signIn = async ({ email, password }) => {
  const {
    rows: [doctor],
  } = await doctorRepository.findByEmail(email);

  const passwordsMatched = bcrypt.compareSync(password, doctor?.password);

  if (!passwordsMatched) {
    const error = new Error("Incorrent email or password.");
    error.statusCode = 401;
    throw error;
  }

  return {
    id: doctor.id,
    name: doctor.name,
    token: jwt.sign({ id: doctor.id }, process.env.SECRET),
  };
};

export default { create, signIn };
