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

const createOffice = async (req, res, next) => {
  const doctorId = Number(res.locals.session);
  const data = req.body;
  try {
    await doctorServices.createOffice({ ...data, id: doctorId });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const data = req.body;
  try {
    const sessionData = await doctorServices.signIn(data);
    res.send(sessionData);
  } catch (error) {
    next(error);
  }
};

export default { create, createOffice, signIn };
