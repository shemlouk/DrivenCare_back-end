import userController from "../controllers/userController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { userSignUp, signIn } from "../schemas/index.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSignUp), userController.create);
userRouter.post("/signin", validateSchema(signIn), userController.signIn);

export default userRouter;
