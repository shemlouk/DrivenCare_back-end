import db from "../config/database.js";

const create = async ({ name, email, password, specialtyId }) => {
  const res = await db.query(
    `
      INSERT INTO doctors (name, email, password, specialty_id)
      VALUES ($1, $2, $3, $4)
    `,
    [name, email, password, specialtyId]
  );
  return res;
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
  const res = await db.query(
    `
      INSERT INTO doctors_office
      (
        doctor_id,
        city,
        state,
        street,
        zip_code,
        neighborhood,
        address_number
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [id, city, state, street, zip_code, neighborhood, address_number]
  );
  return res;
};

const createSchedule = async ({ id, date, startTime, endTime }) => {
  const res = await db.query(
    `
      INSERT INTO doctors_schedule (doctor_id, date, start_time, end_time)
      VALUES ($1, $2, $3, $4)
    `,
    [id, date, startTime, endTime]
  );
  return res;
};

const findByEmail = async (email) => {
  const res = await db.query(
    `
      SELECT * FROM doctors WHERE email = $1
    `,
    [email]
  );
  return res;
};

const findById = async (id) => {
  const res = await db.query(
    `
      SELECT * FROM doctors WHERE id = $1
    `,
    [id]
  );
  return res;
};

const findOfficeByDoctorId = async (id) => {
  const res = await db.query(
    `
      SELECT * FROM doctors_office WHERE doctor_id = $1
    `,
    [id]
  );
  return res;
};

const getIntervalsFromDateByDoctorId = async (id, date) => {
  const res = db.query(
    `
      SELECT id, start_time, end_time
      FROM doctors_schedule
      WHERE doctor_id = $1
        AND date = $2
    `,
    [id, date]
  );
  return res;
};

export default {
  create,
  createOffice,
  createSchedule,
  findByEmail,
  findById,
  findOfficeByDoctorId,
  getIntervalsFromDateByDoctorId,
};
