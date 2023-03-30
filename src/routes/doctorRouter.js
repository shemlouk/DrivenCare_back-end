import doctorController from "../controllers/doctorController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { doctorSignUp, signIn } from "../schemas/index.js";
import { Router } from "express";

const doctorRouter = Router();

doctorRouter.post(
  "/signup",
  validateSchema(doctorSignUp),
  doctorController.create
);
doctorRouter.post("/signin", validateSchema(signIn), doctorController.signIn);

export default doctorRouter;
