import { doctorOffice, doctorSignUp, signIn } from "../schemas/index.js";
import doctorController from "../controllers/doctorController.js";
import validateSchema from "../middlewares/validateSchema.js";
import authentication from "../middlewares/authentication.js";
import { Router } from "express";

const doctorRouter = Router();

doctorRouter.post(
  "/signup",
  validateSchema(doctorSignUp),
  doctorController.create
);

doctorRouter.post("/signin", validateSchema(signIn), doctorController.signIn);

doctorRouter.post(
  "/office",
  authentication,
  validateSchema(doctorOffice),
  doctorController.createOffice
);

export default doctorRouter;
