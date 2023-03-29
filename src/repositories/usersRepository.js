import db from "../config/database.js";

const create = async ({ name, email, password }) => {
  const res = db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );
  return res;
};

const findByEmail = async (email) => {
  const res = db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return res;
};

export default { create, findByEmail };
