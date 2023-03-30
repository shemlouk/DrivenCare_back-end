import doctorServices from "../services/doctorServices.js";

const create = async (req, res, next) => {
  const data = req.body;
  try {
    await doctorServices.create(data);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export default { create };
