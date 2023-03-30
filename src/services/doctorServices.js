import specialtyRepository from "../repositories/specialtyRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const create = async ({ name, email, password, specialtyId }) => {
  /* Checks if email is already signed up */
  const { rowCount: isDuplicate } = await doctorRepository.findByEmail(email);
  if (isDuplicate) {
    const error = new Error("Email already signed up.");
    error.statusCode = 409;
    throw error;
  }

  /* Checks if specialty exists in database */
  const { rowCount: specialtyExists } = await specialtyRepository.findById(
    specialtyId
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
    specialtyId,
    password: hashPassword,
  });
};

const createOffice = async ({
  address_number,
  neighborhood,
  zip_code,
  street,
  state,
  city,
  id,
}) => {
  /* Checks if doctor's id exists */
  const { rowCount: doctorExists } = await doctorRepository.findById(id);
  if (!doctorExists) {
    const error = new Error("Doctor's id not found on database.");
    error.statusCode = 422;
    throw error;
  }

  /* Checks if doctor already has an office registered */
  const { rowCount: officeExists } =
    await doctorRepository.findOfficeByDoctorId(id);
  if (officeExists) {
    const error = new Error("Doctor already has an office registered.");
    error.statusCode = 409;
    throw error;
  }

  /* Creates doctor's office */
  await doctorRepository.createOffice({
    id,
    city,
    state,
    street,
    zip_code,
    neighborhood,
    address_number,
  });
};

const signIn = async ({ email, password }) => {
  const {
    rows: [doctor],
  } = await doctorRepository.findByEmail(email);

  const passwordsMatched = bcrypt.compareSync(password, doctor?.password || "");

  if (!passwordsMatched) {
    const error = new Error("Incorrent email or password.");
    error.statusCode = 401;
    throw error;
  }

  return {
    id: doctor.id,
    name: doctor.name,
    token: jwt.sign({ id: doctor.id }, process.env.SECRET_KEY),
  };
};

export default { create, createOffice, signIn };
