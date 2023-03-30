import db from "../config/database.js";

const findById = async (id) => {
  const res = await db.query(
    `
    SELECT * FROM specialties WHERE id = $1
    `,
    [id]
  );
  return res;
};

const getAll = async () => {
  const res = await db.query(
    `
    SELECT * FROM specialties
    `
  );
  return res;
};

export default { findById, getAll };
