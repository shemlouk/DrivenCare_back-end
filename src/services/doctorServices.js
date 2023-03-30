import specialtyRepository from "../repositories/specialtyRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import bcrypt from "bcrypt";

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

export default { create };
