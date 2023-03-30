import db from "../config/database.js";

const create = async ({ name, email, password, specialty }) => {
  const res = await db.query(
    `
    INSERT INTO doctors (name, email, password, specialty_id)
    VALUES ($1, $2, $3, $4)
    `,
    [name, email, password, specialty]
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

export default { create, findByEmail };
