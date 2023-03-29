import userController from "../controllers/userController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { userSignUp } from "../schemas/index.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSignUp), userController.create);

export default userRouter;
