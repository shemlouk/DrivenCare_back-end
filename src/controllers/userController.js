import userServices from "../services/userServices.js";

const create = async (req, res, next) => {
  const data = req.body;
  try {
    await userServices.create(data);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const data = req.body;
  try {
    const sessionData = await userServices.signIn(data);
    res.send(sessionData);
  } catch (error) {
    next(error);
  }
};

export default { create, signIn };
