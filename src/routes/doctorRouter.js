import doctorController from "../controllers/doctorController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { doctorSignUp } from "../schemas/index.js";
import { Router } from "express";

const doctorRouter = Router();

doctorRouter.post(
  "/signup",
  validateSchema(doctorSignUp),
  doctorController.create
);

export default doctorRouter;
