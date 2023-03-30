import doctorController from "../controllers/doctorController.js";
import validateSchema from "../middlewares/validateSchema.js";
import authentication from "../middlewares/authentication.js";
import * as Schema from "../schemas/index.js";
import { Router } from "express";

const doctorRouter = Router();

doctorRouter.post(
  "/signup",
  validateSchema(Schema.doctorSignUp),
  doctorController.create
);

doctorRouter.post(
  "/signin",
  validateSchema(Schema.signIn),
  doctorController.signIn
);

doctorRouter.post(
  "/office",
  authentication,
  validateSchema(Schema.doctorOffice),
  doctorController.createOffice
);

doctorRouter.post(
  "/schedule",
  authentication,
  validateSchema(Schema.doctorSchedule),
  doctorController.createSchedule
);

export default doctorRouter;
